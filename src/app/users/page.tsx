import Link from "next/link";
import React from "react";

const UsersPage = () => {
  return (
    <div className="space-x-4">
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
