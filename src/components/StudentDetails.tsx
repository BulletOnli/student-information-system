import NotFound from "@/app/not-found";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStudentDetails } from "@/data-access/user";
import { GraduationCap, IdCard, Mail, User } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  userId: string;
};

const StudentDetails = async ({ userId }: Props) => {
  const user = await getStudentDetails(userId);

  if (!user) {
    return <NotFound />;
  }

  if (user.id !== userId) redirect("");

  return (
    <div className="mx-auto space-y-6">
      {/* User Details Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            User Details
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground">
                ID
              </label>
              <p className="font-medium">{user?.id}</p>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground">
                Email
              </label>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <p className="font-medium">{user?.email}</p>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground">
                Name
              </label>
              <p className="font-medium">
                {user?.firstName} {user?.lastName}
              </p>
            </div>
            <div className="space-y-1 space-x-2">
              <label className="text-sm font-medium text-muted-foreground">
                Role
              </label>
              <Badge variant="secondary">{user?.role}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Student Details Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IdCard className="h-5 w-5" />
            Student Details
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground">
                Course ID
              </label>
              <p className="font-medium">cm3×3nrna0000cdwff2a1mrx7</p>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground">
                Year Level
              </label>
              <p className="font-medium">1</p>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground">
                Section
              </label>
              <p className="font-medium">A</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course Details Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Enrolled Course
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground">
                Course ID
              </label>
              <p className="font-medium">cm3x3nrna0000cdwff2a1mrx7</p>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground">
                Course Code
              </label>
              <p className="font-medium">BSIT</p>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground">
                Course Title
              </label>
              <p className="font-medium">
                Bachelor of Science in Information Technology
              </p>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground">
                Course Description
              </label>
              <p className="font-medium">
                Pindot pindot lang daw they said true
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDetails;
