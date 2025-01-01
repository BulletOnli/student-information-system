import React from "react";
import { prisma } from "@/lib/prisma";
import AddGradeModal from "./_components/AddGradeModal";
import GradesTable from "./_components/GradesTable";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import NotFound from "@/app/not-found";
import { UserRole } from "@prisma/client";

async function getEnrolledSubjects(studentId: string) {
  const enrolledSubjects = await prisma.enrolledSubject.findMany({
    where: { studentId },
    include: { subject: true, grades: true },
    orderBy: [{ subject: { code: "asc" } }],
  });

  const processedSubjects = enrolledSubjects.map((subject) => {
    const grades: {
      FIRST: {
        PRELIMS: number | null;
        MIDTERMS: number | null;
        FINALS: number | null;
      };
      SECOND: {
        PRELIMS: number | null;
        MIDTERMS: number | null;
        FINALS: number | null;
      };
    } = {
      FIRST: { PRELIMS: null, MIDTERMS: null, FINALS: null },
      SECOND: { PRELIMS: null, MIDTERMS: null, FINALS: null },
    };

    subject.grades.forEach((grade) => {
      grades[grade.semester][grade.quarter] = grade.grade;
    });

    return {
      id: subject.id,
      code: subject.subject.code,
      title: subject.subject.title,
      grades,
    };
  });

  return processedSubjects;
}

type Props = {
  params: {
    studentId: string;
  };
};

const GradesPage = async ({ params }: Props) => {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const isFaculty = session.user.role === UserRole.FACULTY;

  const subjects = await getEnrolledSubjects(params.studentId);

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
        {isFaculty && <AddGradeModal studentId={params.studentId} />}
      </div>
      <GradesTable subjects={subjects} />
    </div>
  );
};

export default GradesPage;
