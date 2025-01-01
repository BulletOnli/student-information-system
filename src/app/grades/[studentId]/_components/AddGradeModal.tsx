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
import { addGrade } from "../action";
import { useServerAction } from "zsa-react";
import { toast } from "@/hooks/use-toast";
import SelectEnrolledSubject from "@/components/SelectEnrolledSubject";

type Props = {
  studentId: string;
};

export default function AddGradeModal({ studentId }: Props) {
  const [open, setOpen] = useState(false);
  const { isPending, execute } = useServerAction(addGrade);

  const form = useForm<GradeFormValues>({
    resolver: zodResolver(gradeFormSchema),
    defaultValues: {
      enrolledSubjectId: "cm5dyu72z001c11m0ptpayak7",
      semester: "FIRST",
      quarter: "PRELIMS",
      grade: 0,
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
        <Button>Add Grade</Button>
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
              name="quarter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quarter</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select quarter" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="PRELIMS">Prelims</SelectItem>
                      <SelectItem value="MIDTERMS">Midterms</SelectItem>
                      <SelectItem value="FINALS">Finals</SelectItem>
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
                      min="1"
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
