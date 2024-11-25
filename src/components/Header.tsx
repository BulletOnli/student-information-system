"use client";
import React from "react";
import { UserNav } from "./UserNav";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { SearchBar } from "./Search";

const Header = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  return (
    <header className="sticky top-0 w-full bg-background border-b ">
      <div className="mx-auto px-4 sm:px-8 ">
        <div className="flex items-center justify-between h-16">
          <div className="font-semibold">
            <SearchBar />
          </div>

          {/* {session?.user && <UserNav />} */}
        </div>
      </div>
    </header>
  );
};

export default Header;
