import React from "react";
import UsersTable from "./_components/UsersTable";
import CreateUserModal from "./_components/CreateUserModal";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const ManageUsers = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Users</h1>
        <div className="space-x-2">
          <CreateUserModal />
        </div>
      </div>

      <UsersTable />
    </div>
  );
};

export default ManageUsers;
