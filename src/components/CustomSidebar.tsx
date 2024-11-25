import { auth } from "@/auth";
import React from "react";
import DashboardSidebar from "./Sidebar";

const CustomSidebar = async () => {
  const session = await auth();

  return <DashboardSidebar user={session?.user} />;
};

export default CustomSidebar;
