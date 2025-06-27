import { db } from "@/db";
import { agents, meetings } from "@/db/schema";
import { VideoClient } from "@/lib/stream-video";
import {
  CallSessionParticipantLeftEvent,
  CallSessionStartedEvent,
} from "@stream-io/node-sdk";
import { and, eq, not } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

function verifySignatureWithSDK(body: string, signature: string): boolean {
  return VideoClient.verifyWebhook(body, signature);
}

export async function POST(req: NextRequest) {
  const signature = req.headers.get("x-signature");
  const apiKey = req.headers.get("x-api-key");

  if (!apiKey || !signature) {
    return NextResponse.json(
      { error: "Missing Signature or ApiKey" },
      { status: 400 }
    );
  }

  const body = await req.text();
   
  if (!verifySignatureWithSDK(body, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let payload: unknown;

  try {
    payload = JSON.parse(body) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const eventType = (payload as Record<string, unknown>)?.type;
  if (eventType === "call.session_started") {
    const event = payload as CallSessionStartedEvent;
    const meetingId = event.call.custom?.meetingId;

    if (!meetingId) {
      return NextResponse.json({ error: "Missing MeetingId" }, { status: 401 });
    }

    const [existingMeeting] = await db
      .select()
      .from(meetings)
      .where(
        and(
          eq(meetings.id, meetingId),
          not(eq(meetings.status, "completed")),
          not(eq(meetings.status, "cancelled")),
          not(eq(meetings.status, "processing"))
        )
      );

      if (!existingMeeting) {
      return NextResponse.json({ error: "No meetings found" }, { status: 456 });
    }

    await db
      .update(meetings)
      .set({
        status: "active",
        startedAt: new Date(),
      })
      .where(eq(meetings.id, existingMeeting.id));

    const [existingAgent] = await db
      .select()
      .from(agents)
      .where(eq(agents.id, existingMeeting.agentId));

    if (!existingAgent) {
      return NextResponse.json({ error: "No Agent found" }, { status: 414 });
    }

    const call = VideoClient.video.call("default", meetingId);

    const realTimeClient = await VideoClient.video.connectOpenAi({
      call,
      openAiApiKey: process.env.OPENAI_API_KEY!,
      agentUserId: existingAgent.id,
    });

    realTimeClient.updateSession({
      instructions: existingAgent.instructions,
    });
     
  } else if (eventType === "call.session_participant_left") {
    const event = payload as CallSessionParticipantLeftEvent;
    const meetingId = event.call_cid.split(":")[1];
    
    if (!meetingId) {
      return NextResponse.json(
        { error: "Missing Meeting Id" },
        { status: 400 }
      );
    }

    const call = VideoClient.video.call("default", meetingId);
    
    await db
      .update(meetings)
      .set({
        status: "completed",
        endedAt: new Date(),
      })
      .where(eq(meetings.id, meetingId));
    await call.end();

  }
  return NextResponse.json({ status: "ok" });
}
