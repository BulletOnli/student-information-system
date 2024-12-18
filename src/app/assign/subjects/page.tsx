import React from "react";
import AssignSubjectsForm from "./_components/AssignSubjectsForm";
import { auth } from "@/auth";
import { UserRole } from "@prisma/client";
import NotFound from "@/app/not-found";

const AssignSubjectsPage = async () => {
  const session = await auth();

  if (session?.user?.role !== UserRole.FACULTY) {
    return <NotFound />;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Assign Subjects to Students</h1>
      <AssignSubjectsForm />
    </div>
  );
};

export default AssignSubjectsPage;
