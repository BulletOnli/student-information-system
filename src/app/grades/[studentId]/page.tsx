import React from "react";
import { prisma } from "@/lib/prisma";
import AddGradeModal from "./_components/AddGradeModal";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import NotFound from "@/app/not-found";
import { UserRole } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import { getEnrolledSubjectsWithGrades } from "@/data-access/subject";

type Props = {
  params: {
    studentId: string;
  };
};

const GradesPage = async ({ params }: Props) => {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const isFaculty = session.user.role === UserRole.FACULTY;

  const subjects = await getEnrolledSubjectsWithGrades(params.studentId);

  const student = await prisma.student.findFirst({
    where: { id: params.studentId },
    select: { id: true, user: { select: { firstName: true, lastName: true } } },
  });
  if (!student) return <NotFound />;
  const fullName = `${student?.user?.firstName} ${student?.user?.lastName}`;

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between gap-4 mb-4">
        <h1 className="text-2xl font-bold">Grades of {fullName}</h1>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="bg-green-gradient text-white ">
          <CardTitle className="flex justify-between items-center gap-2">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Subjects
              <Badge variant="secondary" className="ml-2">
                {subjects.length}
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-2 pb-0">
          {subjects?.length === 0 && (
            <p className="text-center my-2 text-sm">No subjects yet</p>
          )}

          {subjects?.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject Code</TableHead>
                  <TableHead>Subject Title</TableHead>
                  <TableHead>First Semester</TableHead>
                  <TableHead>Second Semester</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subjects.map((subject) => (
                  <TableRow key={subject.id}>
                    <TableCell>{subject.code}</TableCell>
                    <TableCell>{subject.title}</TableCell>
                    {isFaculty ? (
                      <>
                        <AddGradeModal
                          studentId={params.studentId}
                          grade={subject.grades.FIRST.grade}
                          gradeId={subject.grades.FIRST.id}
                          enrolledSubjectId={subject.id}
                          semester="FIRST"
                        />
                        <AddGradeModal
                          studentId={params.studentId}
                          grade={subject.grades.SECOND.grade}
                          gradeId={subject.grades.SECOND.id}
                          enrolledSubjectId={subject.id}
                          semester="SECOND"
                        />
                      </>
                    ) : (
                      <>
                        <TableCell>
                          {subject.grades.FIRST.grade ?? "-"}
                        </TableCell>
                        <TableCell>
                          {subject.grades.SECOND.grade ?? "-"}
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GradesPage;
