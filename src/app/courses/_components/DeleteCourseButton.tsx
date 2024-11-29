"use client";
import { Button } from "@/components/ui/button";
import { UserRole } from "@prisma/client";
import { Loader2, X } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";
import { useServerAction } from "zsa-react";
import { deleteCourseAction } from "../action";
import { toast } from "@/hooks/use-toast";

type Props = {
  courseId: string;
};

const DeleteCourseButton = ({ courseId }: Props) => {
  const { data: session } = useSession();
  const { isPending, execute } = useServerAction(deleteCourseAction);

  const handleDelete = async () => {
    const [data, err] = await execute({ id: courseId });

    if (err) {
      console.error(err);

      toast({
        title: "An error occurred",
        description: err.message || "Internal server error.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Course deleted",
      description: "The course has been successfully deleted.",
    });
  };

  return (
    <>
      {session?.user?.role === UserRole.ADMIN && (
        <Button
          className="absolute top-2 right-2 rounded-lg size-7"
          size="icon"
          aria-label="Delete Course"
          variant="outline"
          onClick={handleDelete}
          disabled={isPending}
        >
          {isPending ? <Loader2 className="animate-spin" /> : <X />}
        </Button>
      )}
    </>
  );
};

export default DeleteCourseButton;
