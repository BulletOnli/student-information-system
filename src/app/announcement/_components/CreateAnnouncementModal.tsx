"use client";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useServerAction } from "zsa-react";
import { createAnnouncementAction } from "../action";
import { toast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { UserRole } from "@prisma/client";

// Validation schema
const announcementSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});

type AnnouncementFormData = z.infer<typeof announcementSchema>;

type Props = {
  children: ReactNode;
};

export function CreateAnnouncementModal({ children }: Props) {
  const [open, setOpen] = useState(false);
  const { isPending, execute } = useServerAction(createAnnouncementAction);
  const { data: session } = useSession();

  // Initialize form with React Hook Form
  const form = useForm<AnnouncementFormData>({
    resolver: zodResolver(announcementSchema),
    defaultValues: {},
  });

  async function onSubmit(data: AnnouncementFormData) {
    const [result, err] = await execute({
      ...data,
      authorId: session?.user?.id!,
    });

    if (err) {
      toast({
        title: "An error occurred",
        description: err.message || "Internal server error.",
        variant: "destructive",
      });
      return;
    }

    form.reset();
    setOpen(false);
    toast({
      title: "Announcement created",
      description: "The Announcement has been successfully announced.",
    });
  }

  if (!session?.user || session?.user?.role === UserRole.STUDENT) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Announcement</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter announcement title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter announcement content"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              Create Announcement
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
