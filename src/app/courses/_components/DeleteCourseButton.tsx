"use client";
import { Button } from "@/components/ui/button";
import { UserRole } from "@prisma/client";
import { Loader2, X } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useServerAction } from "zsa-react";
import { deleteCourseAction } from "../action";
import { toast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Props = {
  courseId: string;
};

const DeleteCourseButton = ({ courseId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
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
    setIsOpen(false);
  };

  if (session?.user?.role !== UserRole.ADMIN) return null;

  return (
    <>
      {/* {session?.user?.role === UserRole.ADMIN && (
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
      )} */}

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogTrigger asChild>
          <Button
            className="absolute top-2 right-2 rounded-lg size-7"
            size="icon"
            variant="outline"
          >
            <X />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            {/* <AlertDialogAction asChild> */}
            <Button
              aria-label="Delete Course"
              variant="destructive"
              className="bg-red-600 hover:bg-red-600/90"
              onClick={handleDelete}
              disabled={isPending}
            >
              {isPending ? "Deleting..." : "Delete"}
            </Button>
            {/* </AlertDialogAction> */}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteCourseButton;
