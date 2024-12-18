"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SelectCourse from "@/components/SelectCourse";
import SelectStudent from "@/components/SelectStudent";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { CourseSubject } from "@/types";
import { useServerAction } from "zsa-react";
import { assignSubjectsAction } from "../action";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  studentId: z.string({
    required_error: "Please select a student.",
  }),
  courseId: z.string({
    required_error: "Please select a course.",
  }),
  subjects: z.array(z.string()).refine((value) => value.length > 0, {
    message: "Please select at least one subject.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const AssignSubjectsForm = () => {
  const [submittedData, setSubmittedData] = useState<z.infer<
    typeof formSchema
  > | null>(null);
  const searchParams = useSearchParams();
  const { isPending, execute } = useServerAction(assignSubjectsAction);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subjects: [],
      courseId: searchParams.get("courseId") ?? "",
    },
  });

  const courseId = searchParams.get("courseId") ?? form.getValues("courseId");

  const subjectsQuery = useQuery<CourseSubject[]>({
    queryKey: ["subjects", courseId],
    queryFn: async () => {
      const response = await axios.get(`/api/subjects/${courseId}`);
      return response.data;
    },
  });

  const onSubmit = async (values: FormValues) => {
    const [data, err] = await execute({
      selectedSubjects: values.subjects,
      studentId: values.studentId,
    });

    if (err) {
      console.error(err);

      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
      return;
    }

    form.reset();
    toast({
      title: "Success",
      description: "Subject added successfully",
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Assign Subjects</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="studentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student</FormLabel>
                  <SelectStudent {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="courseId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course</FormLabel>
                  <SelectCourse {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            {courseId && (
              <FormField
                control={form.control}
                name="subjects"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">Subjects</FormLabel>
                      <FormDescription>
                        Select the subjects you want to assign.
                      </FormDescription>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {subjectsQuery.isLoading && (
                        <FormMessage className="col-span-2">
                          Loading...
                        </FormMessage>
                      )}

                      {subjectsQuery?.data?.map(
                        ({ subject, courseId }, index) => (
                          <FormField
                            key={index}
                            control={form.control}
                            name="subjects"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={index + courseId}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(
                                        subject?.id
                                      )}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              subject?.id,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== subject?.id
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {subject?.code} - {subject?.title}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        )
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </CardContent>
          <CardFooter>
            <Button disabled={isPending} type="submit" className="w-full">
              {isPending ? "Please wait..." : "Assign Subjects"}
            </Button>
          </CardFooter>
        </form>
      </Form>
      {submittedData && (
        <CardContent>
          <h3 className="font-semibold mb-2">Submitted Data:</h3>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            {JSON.stringify(submittedData, null, 2)}
          </pre>
        </CardContent>
      )}
    </Card>
  );
};

export default AssignSubjectsForm;
