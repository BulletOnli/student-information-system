import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }

  return (
    <div className="w-full h-screen bg-[url(/images/auth-bg.svg)] bg-cover">
      {children}
    </div>
  );
}
