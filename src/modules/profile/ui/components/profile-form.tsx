import React from "react";
import { ProfileGetOne } from "../../types";
import { useTRPC } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateProfileSchema } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Props {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialValues?: ProfileGetOne;
}

const ProfileForm = ({ onSuccess, onCancel, initialValues }: Props) => {
  const trpc = useTRPC();
  const router = useRouter();
  const QueryClient = useQueryClient();

  const updateProfile = useMutation(
    trpc.profiles.update.mutationOptions({
      onSuccess: () => {
        QueryClient.invalidateQueries();
        if (initialValues?.id) {
            QueryClient.invalidateQueries(
                trpc.profiles.getOne.queryOptions({ id:initialValues.id })
            )
        }
        onSuccess?.()
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })
  )

  const form = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      id: initialValues?.id,
      bio: initialValues?.bio ?? "",
      githubUrl: initialValues?.githubUrl ?? "",
    },
  });

  const onSubmit = (values: z.infer<typeof updateProfileSchema>) => {
      updateProfile.mutate({...values, id:initialValues!.id})
    }


  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="bio"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Add your bio here."/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />

        <FormField
          name="githubUrl"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Github Profile Link</FormLabel>
              <FormControl>
                <Input {...field} placeholder="github.com/user_name"/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <div className="flex justify-between gap-x-2">
            {onCancel && (
                <Button variant="ghost" type="button" onClick={()=>onCancel()}>
                    Cancel
                </Button>
            )}
            <Button type="submit">
                Update Profile
            </Button>
            
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;
