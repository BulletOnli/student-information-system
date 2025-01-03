import NotFound from "@/app/not-found";
import { auth } from "@/auth";
import StudentDetails from "@/components/UserDetails";
import { getStudentDetails } from "@/data-access/user";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    userId: string;
  };
};

const UserDetailsPage = async ({ params }: Props) => {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const user = await getStudentDetails(params.userId);

  if (!user) {
    return <NotFound />;
  }

  return (
    <div className="mx-auto p-6 space-y-6">
      <StudentDetails userId={params.userId} />
    </div>
  );
};

export default UserDetailsPage;
