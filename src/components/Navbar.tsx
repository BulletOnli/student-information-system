"use client";
import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  return (
    <nav className="sticky top-0 w-full bg-background border-b ">
      <div className=" mx-auto px-4 sm:px-0 ">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-primary">SIS</span>
            </Link>
          </div>
          <div className="hidden md:block">
            {session?.user ? (
              <button onClick={() => signOut()}>Sign Out</button>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
