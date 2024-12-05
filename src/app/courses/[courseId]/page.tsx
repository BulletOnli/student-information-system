import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";
import { getCourseDetails } from "@/data-access/course";
import NotFound from "@/app/not-found";
import ManageCourseModal from "../_components/ManageCourseModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ManageUserModal from "@/app/users/[role]/_components/ManageUserModal";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { UserRole } from "@prisma/client";
import DeleteCourseButton from "../_components/DeleteCourseButton";

type Props = {
  params: {
    courseId: string;
  };
};

export default async function CourseInfo({ params }: Props) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const isStudent = session.user?.role === UserRole.STUDENT;

  const course = await getCourseDetails(params.courseId);
  if (!course) return <NotFound />;

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{course.title}</h1>
          <div className="text-muted-foreground mt-2">
            Course Code: <Badge variant="outline">{course.code}</Badge>
          </div>
        </div>

        {!isStudent && (
          <div className="flex items-center gap-2">
            <ManageCourseModal defaultValues={course} />
            <DeleteCourseButton courseId={params.courseId}>
              <Button variant="outline">Delete</Button>
            </DeleteCourseButton>
          </div>
        )}
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="bg-primary/5">
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

      {!isStudent && (
        <Card>
          <CardHeader className="bg-primary/5">
            <CardTitle className="flex justify-between items-center gap-2">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Enrolled Students
                <Badge variant="secondary" className="ml-2">
                  {course?.students.length}
                </Badge>
              </div>

              <ManageUserModal role={"STUDENT"} courseId={course.id} />
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            {course?.students?.length === 0 && (
              <p className="text-center my-2 text-sm">
                No enrolled students yet
              </p>
            )}

            {course?.students?.length >= 1 && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>First name</TableHead>
                    <TableHead>Last name</TableHead>
                    <TableHead>Year Level</TableHead>
                    <TableHead>Section</TableHead>
                    <TableHead className="lg:w-[7rem]">Status</TableHead>
                    <TableHead className="text-center lg:w-[12rem] ">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {course?.students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">
                        {student?.user?.firstName}
                      </TableCell>
                      <TableCell className="font-medium">
                        {student?.user?.lastName}
                      </TableCell>
                      <TableCell>{student?.yearLevel}</TableCell>
                      <TableCell>{student?.section}</TableCell>
                      <TableCell>
                        <Badge>Enrolled</Badge>
                      </TableCell>
                      <TableCell className="flex items-center gap-1 justify-center">
                        <Link href={`/user/${student?.user?.id}`}>
                          <Button size="icon" variant="outline">
                            <Eye />
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
