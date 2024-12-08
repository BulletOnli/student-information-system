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

const SelectFaculty = ({
  value,
  onChange,
  onBlur,
  disabled,
  name,
}: SelectProps) => {
  const userQuery = useQuery<UserProps[]>({
    queryKey: ["faculties"],
    queryFn: async () => {
      const response = await axios.get("/api/user/faculties");
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
          <SelectValue placeholder="Select faculty" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {userQuery.data?.length === 0 && (
          <SelectItem value="test" disabled>
            NO AVAILABLE FACULTY
          </SelectItem>
        )}

        {userQuery.data?.map(({ id: facultyId, user }) => (
          <SelectItem key={facultyId} value={facultyId}>
            {user.firstName} {user.lastName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectFaculty;
