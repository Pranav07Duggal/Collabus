"use client"
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";


export default function HomeView() {
  const {data: session} = authClient.useSession() 
  const router = useRouter();
  
  if(session){
    return(
      <div className="flex flex-col p-4 gap-y-4">
        <h1>
        hi!  {session.user.name}
      </h1>
      <Button
      onClick={ ()=>{
        authClient.signOut({
          fetchOptions:{
            onSuccess: ()=>{
              router.push("/sign-in")
            }
          }
        })
      }}
      >Sign Out</Button>
      </div>
    )
  }
  return (
    <div className="p-4 flex flex-col gap-y-4 ">
      Loading...
    </div>   
    );
}
