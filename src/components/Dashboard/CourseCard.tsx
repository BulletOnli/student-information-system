import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import DeleteCourseButton from "@/app/courses/_components/DeleteCourseButton";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { auth } from "@/auth";
import { UserRole } from "@prisma/client";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  code: string;
  _count: { students: number; subjects: number };
}

export async function CourseCard({
  title,
  description,
  code,
  id,
  _count,
}: CourseCardProps) {
  const session = await auth();

  return (
    <Card className="relative min-h-[10rem] border-none bg-gradient-to-br from-commonGreen to-[#259125] text-white transition-colors flex flex-col">
      <DeleteCourseButton courseId={id}>
        <Button
          className="absolute top-2 right-2 rounded-lg size-7 bg-transparent"
          size="icon"
          variant="ghost"
        >
          <X />
        </Button>
      </DeleteCourseButton>

      <Link
        href={`/courses/${id}`}
        className="h-full flex flex-col justify-between gap-2"
      >
        <CardHeader className="flex flex-row items-center space-x-4 pb-2 pr-8">
          <div className="size-11 aspect-square rounded-full bg-primary/10 flex items-center justify-center">
            <img src="/images/gjc-logo.png" alt="GJC Logo" />
          </div>
          <div>
            <CardTitle className="font-medium mb-1">
              {title} ({code})
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col mx-4 gap-4">
          <p className="text-sm">{description}</p>

          {session?.user?.role === UserRole.ADMIN && (
            <div className="text-end">
              <p className="text-lg">{_count?.students}</p>
              <p className="text-xs ">Enrolled Students</p>
            </div>
          )}
        </CardContent>
      </Link>
    </Card>
  );
}
