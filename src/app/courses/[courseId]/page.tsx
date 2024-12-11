import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Info } from "lucide-react";
import { getCourseDetails } from "@/data-access/course";
import NotFound from "@/app/not-found";
import ManageCourseModal from "../_components/ManageCourseModal";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { UserRole } from "@prisma/client";
import DeleteCourseButton from "../_components/DeleteCourseButton";
import EnrolledStudentsTable from "./_components/EnrolledStudentsTable";
import SubjectsTable from "./_components/SubjectsTable";
import Link from "next/link";

type Props = {
  params: {
    courseId: string;
  };
};

export default async function CourseInfo({ params }: Props) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const isStudent = session.user?.role === UserRole.STUDENT;
  const isAdmin = session.user?.role === UserRole.ADMIN;

  const course = await getCourseDetails(params.courseId);
  if (!course) return <NotFound />;

  return (
    <div className="container mx-auto p-6 space-y-8">
      <Button asChild size="sm">
        <Link href={`/courses`}>
          <ArrowLeft />
          <p>Go back</p>
        </Link>
      </Button>

      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{course.title}</h1>
          <div className="text-muted-foreground mt-2">
            Course Code: <Badge variant="outline">{course.code}</Badge>
          </div>
        </div>

        {isAdmin && (
          <div className="flex items-center gap-2">
            <ManageCourseModal defaultValues={course} />
            <DeleteCourseButton courseId={params.courseId}>
              <Button variant="outline">Delete</Button>
            </DeleteCourseButton>
          </div>
        )}
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="bg-green-gradient text-white ">
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            Course Details
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 p-6 sm:grid-cols-2">
          <div>
            <div className="text-sm font-medium text-muted-foreground mb-1">
              Course ID
            </div>
            <div className="font-mono text-sm bg-muted p-2 rounded-md">
              {course.id}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-muted-foreground mb-1">
              Course Code
            </div>
            <div className="font-medium">BSIT</div>
          </div>
          <div className="sm:col-span-2">
            <div className="text-sm font-medium text-muted-foreground mb-1">
              Description
            </div>
            <div className="text-sm text-pretty">{course.description}</div>
          </div>
        </CardContent>
      </Card>

      <SubjectsTable courseId={params.courseId} />

      {!isStudent && (
        <EnrolledStudentsTable
          students={course.students}
          courseId={course.id}
        />
      )}
    </div>
  );
}
