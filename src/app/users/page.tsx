import { auth } from "@/auth";
import { UserRole } from "@prisma/client";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const UsersPage = async () => {
  const session = await auth();
  if (session?.user?.role === UserRole.STUDENT) {
    redirect("/");
  }

  return (
    <div className="space-x-4 p-6">
      <Link href="/users/student" className="text-blue-600 underline">
        Student
      </Link>
      <Link href="/users/faculty" className="text-blue-600 underline">
        Faculty
      </Link>
      <Link href="/users/admin" className="text-blue-600 underline">
        Admin
      </Link>
    </div>
  );
};

export default UsersPage;
