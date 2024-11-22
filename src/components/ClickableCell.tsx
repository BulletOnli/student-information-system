"use client";
import { TableCell } from "@/components/ui/table";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  children: string;
  route?: string;
  className?: string;
};

const ClickableCell = ({ children, route, className }: Props) => {
  const router = useRouter();

  const handleClick = () => {
    if (!route) return;
    router.push(route);
  };

  return (
    <TableCell onClick={handleClick} className={className}>
      {children}
    </TableCell>
  );
};

export default ClickableCell;
