import { auth } from "@/auth";
import { getStudentDetails, getUserDetails } from "@/data-access/user";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";
import NotFound from "../not-found";

const GradesRedirect = async () => {
  const session = await auth();
  if (!session?.user || !session?.user?.id) redirect("/login");

  const isStudent = session.user.role === UserRole.STUDENT;
  if (!isStudent) return <NotFound />;

  const user = await getStudentDetails(session.user.id);
  if (!user) return <NotFound />;

  redirect(`/grades/${user?.student?.id}`);
};

export default GradesRedirect;
