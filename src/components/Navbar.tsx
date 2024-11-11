"use client";
import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="fixed top-0 w-full bg-background border-b ">
      <div className="max-w-7xl mx-auto px-4 sm:px-0 ">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-primary">SIS</span>
            </Link>
          </div>
          <div className="hidden md:block">
            {session?.user ? (
              <button
                className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium "
                onClick={() => signOut({ redirectTo: "/sign-in" })}
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign Up
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
