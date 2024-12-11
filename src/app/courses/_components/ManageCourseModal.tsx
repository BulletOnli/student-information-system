"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useServerAction } from "zsa-react";
import { addCourseAction, updateCourseAction } from "../action";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  code: z.string().min(2, {
    message: "Course code must be at least 2 characters.",
  }),
  title: z.string().min(3, {
    message: "Course title must be at least 3 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
});

type Props = {
  defaultValues?: z.infer<typeof formSchema> & { id: string };
};

const ManageCourseModal = ({ defaultValues }: Props) => {
  const [open, setOpen] = useState(false);
  const { isPending, execute } = useServerAction(
    defaultValues ? updateCourseAction : addCourseAction
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ? defaultValues : undefined,
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const updatedValues = defaultValues
      ? { ...values, id: defaultValues.id }
      : values;

    const [data, err] = await execute(updatedValues);

    if (err) {
      console.error(err.data);
      if (err.message.includes("code")) {
        form.setError("code", { message: "This course already exist." });
      }

      toast({
        title: "An error occurred",
        description: err.message || "Internal server error.",
        variant: "destructive",
      });
      return;
    }

    setOpen(false);
    form.reset();
    toast({
      title: "Course created",
      description: "The course has been successfully created.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{defaultValues ? "Edit Course" : "Add Course"}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {defaultValues ? "Edit Course" : "Add New Course"}
          </DialogTitle>
          <DialogDescription>Fill in the details below.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Code</FormLabel>
                  <FormControl>
                    <Input placeholder="BSIT" {...field} />
                  </FormControl>
                  <FormDescription>
                    The unique identifier for this course.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Bachelor of Science in Information Technology"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The full title of the course.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="A comprehensive introduction to the fundamental principles of computer science..."
                      className="resize-none"
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    A brief description of the course content and objectives.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ManageCourseModal;
