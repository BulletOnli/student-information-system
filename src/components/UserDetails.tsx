import NotFound from "@/app/not-found";
import ManageUserModal from "@/app/users/[role]/_components/ManageUserModal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserDetails } from "@/data-access/user";
import { Faculty, UserRole, User as UserType } from "@prisma/client";
import { GraduationCap, IdCard, Mail, User } from "lucide-react";
import React from "react";

type Props = {
  userId: string;
};

const UserDetails = async ({ userId }: Props) => {
  const user = await getUserDetails(userId);

  if (!user) {
    return <NotFound />;
  }

  return (
    <div className="mx-auto space-y-6 ">
      {user.role !== UserRole.STUDENT && (
        <ManageUserModal defaultValues={user} role={user.role} />
      )}

      {/* User Details Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-commonGreen">
            <User className="h-5 w-5" />
            User Details
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 text-gray-500">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-commonGreen">
                School ID
              </label>
              <p className="font-medium">{user?.schoolId}</p>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-commonGreen">
                Email
              </label>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-commonGreen" />
                <p className="font-medium">{user?.email}</p>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-commonGreen">
                Name
              </label>
              <p className="font-medium">
                {user?.firstName} {user?.lastName}
              </p>
            </div>
            <div className="space-y-1 space-x-2">
              <label className="text-sm font-medium text-commonGreen">
                Role
              </label>
              <Badge variant="secondary" className="text-gray-500">
                {user?.role}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Faculty Details Card */}
      {user.role === UserRole.FACULTY && (
        <FacultyDetails faculty={user.faculty} user={user} />
      )}

      {/* Course Details Card */}
      {user.role === UserRole.STUDENT && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-commonGreen">
              <GraduationCap className="h-5 w-5" />
              Enrolled Course
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 text-gray-500">
            {user.student?.course ? (
              <div className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-commonGreen">
                      Course ID
                    </label>
                    <p className="font-medium">{user?.student?.course?.id}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-commonGreen">
                      Year Level
                    </label>
                    <p className="font-medium">{user?.student?.yearLevel}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-commonGreen">
                      Section
                    </label>
                    <p className="font-medium">{user?.student?.section}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-commonGreen">
                    Course Code
                  </label>
                  <p className="font-medium">{user.student?.course?.code}</p>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-commonGreen">
                    Course Title
                  </label>
                  <p className="font-medium">{user.student?.course?.title}</p>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-commonGreen">
                    Course Description
                  </label>
                  <p className="font-medium">
                    {user.student?.course?.description}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-commonGreen">
                The user is not enrolled in any course.
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

type FacultyProps = {
  faculty: Faculty | null;
  user: UserType;
};

const FacultyDetails = ({ user, faculty }: FacultyProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-commonGreen">
          <IdCard className="h-5 w-5" />
          {user?.role.charAt(0).toUpperCase() +
            user?.role.slice(1).toLowerCase()}{" "}
          Details
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-500">
          <div className="space-y-1">
            <label className="text-sm font-medium text-commonGreen">
              Course ID
            </label>
            <p className="font-medium">{faculty?.id}</p>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-commonGreen">
              Department
            </label>
            <p className="font-medium">{faculty?.department}</p>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-commonGreen">
              Position
            </label>
            <p className="font-medium">{faculty?.position}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserDetails;
