import { auth } from "@/auth";
import StudentDashboardLayout from "@/components/layouts/StudentDashboardLayout";
import { UserRole } from "@prisma/client";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const Homepage = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role === UserRole.STUDENT) {
    return <StudentDashboardLayout />;
  }

  return <div className="w-full p-6">DASHBOARD</div>;
};

export default Homepage;
