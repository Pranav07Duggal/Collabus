"use client";

import { useEffect, useState } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const onSubmit = form.handleSubmit(async (values) => {
    if (isSubmitting) return; // Optional double-submit guard
  
    setIsSubmitting(true);
  
    try {
      if (initialValues?.id) {
        await updateProject.mutateAsync({
          ...values,
          id: initialValues.id,
        });
      } else {
        await addProject.mutateAsync({ ...values });
      }
    } catch (err) {
      // Handle error here: toast, etc.
    } finally {
      setIsSubmitting(false);
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
      <SheetContent className="w-[400px] sm:w-[600px] overflow-auto p-4">
        <SheetTitle>Project Form</SheetTitle>
        <SheetDescription> Fill details of the project</SheetDescription>
        <form onSubmit={onSubmit} className="space-y-4 mt-4">
          <h2 className="text-medium font-semibold mb-4">
            {initialValues ? "Edit Project" : "Add Project"}
          </h2>
          <div className="">
            <Label className="text-muted-foreground" htmlFor="title">
              Project Name
            </Label>
            <Input
              {...form.register("title")}
              placeholder="Give your project a name"
              id="title"
              className="mt-1"
            />
          </div>
          <div className="">
            <Label className="text-muted-foreground" htmlFor="desc">
              Description
            </Label>
            <Textarea
              {...form.register("description")}
              placeholder="Write a short summary of your software project — key features, purpose, or tech used (max 500 characters)."
              id="desc"
              className="mt-1"
            />
          </div>
          <div className="">
            <Label className="text-muted-foreground" htmlFor="gitlink">
              Link to Github Repository
            </Label>
            <Input
              {...form.register("githubUrl")}
              placeholder="https://github.com/user_name/repo_name"
              id="gitlink"
              className="mt-1"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-muted-foreground" htmlFor="scope">
              Type of Project
            </Label>

            <Select
              onValueChange={(value: "PRIVATE" | "PUBLIC" | "COMPETITION") =>
                form.setValue("visibility", value)
              }
              defaultValue={form.getValues("visibility")}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select visibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PRIVATE">Private</SelectItem>
                <SelectItem value="PUBLIC">Public</SelectItem>
                <SelectItem value="COMPETITION">Competition</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <TechStackSelector
            value={techStack!}
            onChange={(stack) => form.setValue("techStack", stack)}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? initialValues
                ? "Updating..."
                : "Submitting..."
              : initialValues
              ? "Update"
              : "Submit"}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
