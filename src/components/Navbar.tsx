import React from "react";
import Link from "next/link";
import { auth, signOut } from "@/auth";

const Navbar = async () => {
  const session = await auth();

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
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium ">
                  Logout
                </button>
              </form>
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
