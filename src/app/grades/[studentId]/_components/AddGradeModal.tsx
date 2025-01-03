"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { gradeFormSchema, GradeFormValues } from "@/lib/zod";
import { addGrade, updateGradeAction } from "../action";
import { useServerAction } from "zsa-react";
import { toast } from "@/hooks/use-toast";
import SelectEnrolledSubject from "@/components/SelectEnrolledSubject";
import { TableCell } from "@/components/ui/table";
import { Semester } from "@prisma/client";

type Props = {
  studentId: string;
  grade: number | null;
  gradeId: string | null;
  enrolledSubjectId: string;
  semester: Semester;
};

export default function AddGradeModal({
  studentId,
  grade,
  enrolledSubjectId,
  semester,
  gradeId,
}: Props) {
  const [open, setOpen] = useState(false);
  const { isPending, execute } = useServerAction(
    grade ? updateGradeAction : addGrade
  );

  const form = useForm<GradeFormValues>({
    resolver: zodResolver(gradeFormSchema),
    defaultValues: {
      enrolledSubjectId,
      semester,
      grade: Number(grade) || 0,
      gradeId: gradeId,
    },
  });

  const onSubmit = async (values: GradeFormValues) => {
    const [data, err] = await execute(values);

    if (err) {
      console.error(err);
      if (
        err.message.includes(
          "Unique constraint failed on the fields: (`semester`,`quarter`,`enrolledSubjectId`)"
        )
      ) {
        toast({
          title: "Error",
          description:
            "Grade already exists for this subject, semester, and quarter",
          variant: "destructive",
        });
        return;
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
      description: "Grade added successfully",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <TableCell className="cursor-text border border-gray-200 rounded-md bg-white px-3 py-2 text-left hover:border-gray-300">
          {grade !== null ? Number(grade) : "-"}
        </TableCell>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Grade</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="enrolledSubjectId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject ID</FormLabel>
                  <FormControl>
                    <SelectEnrolledSubject {...field} studentId={studentId} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="semester"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Semester</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select semester" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="FIRST">First</SelectItem>
                      <SelectItem value="SECOND">Second</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="grade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grade</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.25"
                      min="0"
                      max="5"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending}>
              {isPending ? "Adding Grade..." : "Add Grade"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
