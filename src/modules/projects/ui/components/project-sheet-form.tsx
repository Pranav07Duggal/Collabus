"use client";

import { useEffect, useState } from "react";
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTRPC } from "@/trpc/client";
import { toast } from "sonner";
import { TechStackSelector } from "./tech-selector";
import { useMutation } from "@tanstack/react-query";

const formSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1).max(300),
  githubUrl: z.string().url(),
  visibility: z.enum(["PUBLIC", "PRIVATE", "COMPETITION"]),
  techStack: z.array(z.string().min(1)).optional(),
});

type FormSchema = z.infer<typeof formSchema>;

type ProjectFormProps = {
  initialValues?: {
    id: string;
    title: string;
    description: string;
    githubUrl: string;
    visibility: "PUBLIC" | "PRIVATE" | "COMPETITION";
    techStack?: string[];
  };
  triggerButton: React.ReactNode;
  onSuccess?: (updatedOrCreatedProject: any) => void;
};

export function ProjectSheetForm({
  initialValues,
  triggerButton,
  onSuccess,
}: ProjectFormProps) {
  const trpc = useTRPC();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialValues?.title ?? "",
      description: initialValues?.description ?? "",
      githubUrl: initialValues?.githubUrl ?? "",
      visibility: initialValues?.visibility ?? "PRIVATE",
      techStack: initialValues?.techStack ?? [],
    },
  });

  const techStack = form.watch("techStack");

  const addProject = useMutation(
    trpc.projects.addProject.mutationOptions({
      onSuccess: (data) => {
        toast.success("Project added");
        setOpen(false);
        form.reset();
        onSuccess?.(data);
      },
      onError: (err) => toast.error(err.message),
    })
  );

  const updateProject = useMutation(
    trpc.projects.updateProject.mutationOptions({
      onSuccess: (data) => {
        toast.success("Project updated");
        setOpen(false);
        form.reset();
        onSuccess?.(data);
      },
      onError: (err) => toast.error(err.message),
    })
  );

  const onSubmit = form.handleSubmit((values) => {
    if (initialValues?.id) {
      updateProject.mutate({
        ...values,
        id: initialValues.id, // ✅ correct key expected by schema
      });
    } else {
      addProject.mutate({ ...values });
    }
  });

  // Reset form when modal opens for a new project
  useEffect(() => {
    if (open && initialValues) {
      form.setValue("title", initialValues.title);
      form.setValue("description", initialValues.description);
      form.setValue("githubUrl", initialValues.githubUrl);
      form.setValue("visibility", initialValues.visibility);
      form.setValue("techStack", initialValues.techStack ?? []);
    }
  }, [open]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{triggerButton}</SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[500px] overflow-auto">
      <SheetTitle>Add Project</SheetTitle> {/* ✅ Required for accessibility */}
        <form onSubmit={onSubmit} className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold mb-2">
            {initialValues ? "Edit Project" : "Add Project"}
          </h2>

          <Input {...form.register("title")} placeholder="Project Title" />
          <Textarea
            {...form.register("description")}
            placeholder="Short Description"
          />
          <Input
            {...form.register("githubUrl")}
            placeholder="GitHub Repository URL"
          />

          <select
            {...form.register("visibility")}
            className="w-full border p-2 rounded-md"
          >
            <option value="PRIVATE">Private</option>
            <option value="PUBLIC">Public</option>
            <option value="COMPETITION">Competition</option>
          </select>

          <TechStackSelector
            value={techStack!}
            onChange={(stack) => form.setValue("techStack", stack)}
          />

          <Button type="submit" className="w-full">
            {initialValues ? "Update" : "Submit"}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
