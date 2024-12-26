"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { FormControl } from "./ui/form";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type UserProps = {
  id: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
};

type SelectProps = {
  value?: string | null | undefined;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  disabled?: boolean;
  name?: string;
};

const SelectStudent = ({
  value,
  onChange,
  onBlur,
  disabled,
  name,
}: SelectProps) => {
  const userQuery = useQuery<UserProps[]>({
    queryKey: ["students"],
    queryFn: async () => {
      const response = await axios.get("/api/user/students");
      return response.data;
    },
  });

  return (
    <Select
      value={value ?? ""}
      onValueChange={onChange}
      name={name}
      disabled={disabled}
      onOpenChange={() => {
        if (onBlur) onBlur();
      }}
    >
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Select student" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {userQuery.isLoading && (
          <SelectItem value="test" disabled>
            Loading...
          </SelectItem>
        )}

        {userQuery.data?.length === 0 && (
          <SelectItem value="test" disabled>
            NO AVAILABLE STUDENTS
          </SelectItem>
        )}

        {userQuery.data?.map(({ id: studentId, user }) => (
          <SelectItem key={studentId} value={studentId}>
            {user.firstName} {user.lastName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectStudent;
