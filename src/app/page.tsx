import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const LINKS = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Users",
    href: "/users",
  },
  {
    title: "Courses",
    href: "/courses",
  },
];

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
        {LINKS.map((link) => (
          <Link key={link.href} href={link.href} className="text-blue-500">
            {link.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
