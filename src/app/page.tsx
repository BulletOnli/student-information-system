import { auth } from "@/auth";
import { UserRole } from "@prisma/client";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const LINKS = [
  {
    title: "Home",
    href: "/",
    allowedRoles: [
      UserRole.ADMIN,
      UserRole.FACULTY,
      UserRole.STUDENT,
    ] as string[],
  },
  {
    title: "Users",
    href: "/users",
    allowedRoles: [UserRole.ADMIN] as string[],
  },
  {
    title: "Courses",
    href: "/courses",
    allowedRoles: [
      UserRole.ADMIN,
      UserRole.FACULTY,
      UserRole.STUDENT,
    ] as string[],
  },
] as const;

const Homepage = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="w-full p-10">
      <p>
        Hi {session.user.role}, {session.user.name}
      </p>

      <div className="flex items-center gap-6">
        {LINKS.map((link) => {
          if (!link.allowedRoles.includes(session.user?.role ?? "")) {
            return null;
          }

          return (
            <Link key={link.href} href={link.href} className="text-blue-500">
              {link.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Homepage;
