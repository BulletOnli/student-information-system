import React from "react";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getCourseSubjects } from "@/data-access/subject";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SubjectCard } from "@/components/Subject/SubjectCard";
import { UserRole } from "@prisma/client";
import ManageSubjectModal from "../_components/ManageSubjectModal";

type Props = {
  params: {
    courseId: string;
  };
};

const SubjectsPage = async ({ params }: Props) => {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const subjects = await getCourseSubjects(params.courseId);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Button asChild size="sm">
        <Link href={`/courses/${params.courseId}`}>
          <ArrowLeft />
          <p>Go back</p>
        </Link>
      </Button>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Subjects</h1>

        {session.user.role === UserRole.ADMIN && (
          <ManageSubjectModal courseId={params.courseId} />
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3">
        {subjects.length === 0 && <p className="text-sm">No subjects yet.</p>}

        {subjects?.slice(0, 3).map(({ subject }) => (
          <SubjectCard key={subject.title} {...subject} />
        ))}
      </div>
    </div>
  );
};

export default SubjectsPage;
