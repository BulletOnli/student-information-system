import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { UserRole } from "@prisma/client";
import ManageUserModal from "./_components/ManageUserModal";
import UsersTable from "./_components/UsersTable";
import NotFound from "@/app/not-found";

type Props = {
  params: {
    role: UserRole;
  };
};

const allowedRoles = [
  UserRole.FACULTY,
  UserRole.STUDENT,
  UserRole.ADMIN,
] as string[];

const ManageUsers = async ({ params }: Props) => {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== UserRole.ADMIN) {
    redirect("/");
  }

  if (!allowedRoles.includes(params.role.toUpperCase())) {
    return <NotFound />;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage {params.role}</h1>
        <div className="space-x-2">
          <ManageUserModal role={params.role.toUpperCase() as UserRole} />
        </div>
      </div>

      <UsersTable role={params.role.toUpperCase() as UserRole} />
    </div>
  );
};

export default ManageUsers;