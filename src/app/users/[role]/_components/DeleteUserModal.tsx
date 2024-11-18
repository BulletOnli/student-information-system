"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AlertTriangle, Trash } from "lucide-react";
import { useServerAction } from "zsa-react";
import { deleteUserAction } from "../../action";
import { toast } from "@/hooks/use-toast";

type Props = {
  userId: string;
  role: "STUDENT" | "FACULTY" | "ADMIN";
};

const DeleteUserModal = ({ userId, role }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isPending, execute } = useServerAction(deleteUserAction);

  const handleDelete = async () => {
    const [data, err] = await execute({ userId, role });

    if (err) {
      console.error(err);
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
      return;
    }

    setIsOpen(false);
    toast({
      title: "User Deleted",
      description: "The user has been successfully deleted.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <Trash className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Confirm Deletion
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this user? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUserModal;
