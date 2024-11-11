import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

const Homepage = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in");
  }

  return <div>Hello, {session?.user.email}</div>;
};

export default Homepage;
