"use client";

import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, PlusCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useServerAction } from "zsa-react";
import { addSubjectAction, updateSubjectAction } from "../action";
import SelectFaculty from "@/components/SelectFaculty";

const subjectSchema = z.object({
  code: z.string().min(2, "Code must be at least 2 characters"),
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  facultyId: z.string().nullable().optional(),
});

type SubjectFormValues = z.infer<typeof subjectSchema>;

type Props = {
  courseId: string;
  defaultValues?: SubjectFormValues & {
    id: string;
  };
};

const ManageSubjectModal: FC<Props> = ({ courseId, defaultValues }) => {
  const [open, setOpen] = useState(false);
  const { isPending, execute } = useServerAction(
    defaultValues ? updateSubjectAction : addSubjectAction
  );

  const form = useForm<SubjectFormValues>({
    resolver: zodResolver(subjectSchema),
    defaultValues: defaultValues ? defaultValues : undefined,
  });

  const onSubmit = async (values: SubjectFormValues) => {
    const updatedValues = defaultValues
      ? { ...values, id: defaultValues.id, courseId }
      : { ...values, courseId };

    const [data, err] = await execute(updatedValues);
    if (err) {
      console.error(err);
      if (err.message.includes("code")) {
        form.setError("code", { message: "This subject already exist." });
      } else if (err.message.includes("title")) {
        form.setError("title", {
          message: "This title already exist.",
        });
      }

      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
      return;
    }

    setOpen(false);
    form.reset();
    toast({
      title: "Success",
      description: "Subject added successfully",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-black">
          {defaultValues ? (
            <Pencil className="size-4" />
          ) : (
            <PlusCircle className="mr-1 size-4" />
          )}
          {!defaultValues && "Add Subject"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Subject</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Input placeholder="SUB101" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Introduction to Subject" {...field} />
                  </FormControl>
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
                      placeholder="A brief description of the subject"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="facultyId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assigned Faculty (optional)</FormLabel>
                  <SelectFaculty
                    {...field}
                    // key={defaultValues ? defaultValues?.facultyId : ""}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isPending}>
              {isPending ? "Adding Subject..." : "Add Subject"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ManageSubjectModal;
