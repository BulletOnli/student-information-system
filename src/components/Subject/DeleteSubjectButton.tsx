"use client";
import { Button } from "@/components/ui/button";
import { UserRole } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useServerAction } from "zsa-react";
import { toast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteSubjectAction } from "@/components/Subject/action";

type Props = {
  subjectId: string;
  children: React.ReactNode;
};

const DeleteSubjectButton = ({ subjectId, children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const { isPending, execute } = useServerAction(deleteSubjectAction);

  const handleDelete = async () => {
    const [data, err] = await execute({ id: subjectId });

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
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              subject and remove the data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              aria-label="Delete Course"
              variant="destructive"
              className="bg-red-600 hover:bg-red-600/90"
              onClick={handleDelete}
              disabled={isPending}
            >
              {isPending ? "Deleting..." : "Delete"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteSubjectButton;
