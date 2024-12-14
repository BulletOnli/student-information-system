import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import DeleteCourseButton from "@/app/courses/_components/DeleteCourseButton";
import { X } from "lucide-react";
import { auth } from "@/auth";
import { UserRole } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { BasicUserInfo } from "@/types";
import DeleteSubjectButton from "./DeleteSubjectButton";

interface SubjectCardProps {
  id: string;
  title: string;
  description: string;
  code: string;
  faculty: { user: BasicUserInfo } | null;
}

export async function SubjectCard({
  title,
  description,
  code,
  id,
  faculty,
}: SubjectCardProps) {
  return (
    <Card className="relative min-h-[10rem] bg-green-gradient text-white transition-colors flex flex-col">
      <DeleteSubjectButton subjectId={id}>
        <Button
          className="absolute top-2 right-2 rounded-lg size-7"
          size="icon"
          variant="ghost"
        >
          <X />
        </Button>
      </DeleteSubjectButton>

      <CardHeader className="flex flex-row items-center space-x-4 pb-2 pr-8">
        {/* <div className="size-11 aspect-square rounded-full bg-primary/10 flex items-center justify-center">
            <img src="/images/gjc-logo.png" alt="GJC Logo" />
          </div> */}
        <div>
          <CardTitle className="font-medium mb-1 text-xl text-white ">
            {title} ({code})
          </CardTitle>
          <CardDescription className="text-base text-white  ">
            {description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex justify-end items-end mx-4 px-2">
        <div className="text-end ">
          <p className="font-semibold ">
            {faculty?.user?.firstName} {faculty?.user?.lastName}
          </p>
          <p className="text-sm">Subject Teacher</p>
        </div>
      </CardContent>
    </Card>
  );
}
