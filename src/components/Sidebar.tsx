"use client";
import {
  BookOpen,
  LayoutDashboard,
  LogOut,
  Megaphone,
  Settings,
  User as UserIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { UserRole } from "@prisma/client";
import { User } from "next-auth";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

const navigation = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
    prohibitedRoles: [] as UserRole[],
  },
  {
    title: "Courses",
    icon: BookOpen,
    href: "/courses",
    prohibitedRoles: [] as UserRole[],
  },
  {
    title: "Announcements",
    icon: Megaphone,
    href: "/announcement",
    prohibitedRoles: [] as string[],
  },
];

type Props = {
  user: User | undefined;
};
const DashboardSidebar = ({ user }: Props) => {
  const pathname = usePathname();

  if (!user || pathname === "/login" || pathname === "/register") {
    return null;
  }

  const isTabActive = (route: string) => {
    return pathname.toLowerCase() === route.toLowerCase() && "bg-gray-100";
  };

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b p-6">
        <div className="flex flex-col items-center text-center">
          <Avatar className="h-20 w-20 mb-4">
            <AvatarImage src={""} alt={user?.firstName} />
            <AvatarFallback className="bg-green-gradient text-white hover:text-white">
              {user?.firstName?.[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1 text-center">
            <h2 className="text-lg font-semibold">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-sm ">{user?.email}</p>
            <p className="text-sm font-medium ">{user?.role}</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarMenu>
          {navigation.map((item) => {
            if (item.prohibitedRoles.includes(user?.role as UserRole)) {
              return null;
            }

            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild className="px-4 py-6 rounded-lg">
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg text-sm transition-colors ${
                      isTabActive(item.href)
                        ? "bg-green-gradient text-white hover:text-white "
                        : "hover:bg-green-gradient hover:text-white"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}

          {user.role === UserRole.ADMIN && (
            <SidebarMenuItem>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1" className="border-none">
                  <AccordionTrigger className=" flex w-full items-center justify-start gap-3 rounded-lg px-3 py-4 text-sm transition-colors hover:no-underline">
                    <UserIcon className="h-4 w-4" />
                    Users
                  </AccordionTrigger>

                  <Link
                    href="/users/student"
                    className={`flex items-center gap-3 rounded-lg text-sm transition-colors ${
                      isTabActive("/users/student")
                        ? "bg-green-gradient text-white hover:text-white"
                        : "hover:bg-green-gradient hover:text-white"
                    }`}
                  >
                    <AccordionContent className="flex items-center gap-2 px-4 py-4">
                      <UserIcon className="h-4 w-4" />
                      Student
                    </AccordionContent>
                  </Link>

                  <Link
                    href="/users/faculty"
                    className={`flex items-center gap-3 rounded-lg text-sm transition-colors ${
                      isTabActive("/users/faculty")
                        ? "bg-green-gradient text-white hover:text-white"
                        : "hover:bg-green-gradient hover:text-white"
                    }`}
                  >
                    <AccordionContent className="flex items-center gap-2 px-4 py-4">
                      <UserIcon className="h-4 w-4" />
                      Faculty
                    </AccordionContent>
                  </Link>

                  <Link
                    href="/users/admin"
                    className={`flex items-center gap-3 rounded-lg text-sm transition-colors ${
                      isTabActive("/users/admin")
                        ? "bg-green-gradient text-white hover:text-white"
                        : "hover:bg-green-gradient hover:text-white"
                    }`}
                  >
                    <AccordionContent className="flex items-center gap-2 px-4 py-4">
                      <UserIcon className="h-4 w-4" />
                      Admin
                    </AccordionContent>
                  </Link>
                </AccordionItem>
              </Accordion>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 rounded-lg px-3 py-4 text-sm transition-colors hover:bg-green-gradient hover:text-white"
          onClick={() => signOut()}
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
