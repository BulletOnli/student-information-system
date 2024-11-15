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
import { Course } from "@prisma/client";

type SelectProps = {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  disabled?: boolean;
  name?: string;
};

const SelectCourse = ({
  value,
  onChange,
  onBlur,
  disabled,
  name,
}: SelectProps) => {
  const courseQuery = useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: async () => {
      const response = await axios.get("/api/courses");
      return response.data;
    },
  });

  return (
    <Select
      value={value}
      onValueChange={onChange}
      name={name}
      disabled={disabled}
      onOpenChange={() => {
        if (onBlur) onBlur();
      }}
    >
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Select course" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {courseQuery.data?.length === 0 && (
          <SelectItem value="test" disabled>
            NO AVAILABLE COURSES
          </SelectItem>
        )}

        {courseQuery.data?.map((course) => (
          <SelectItem key={course.id} value={course.id}>
            {course.code}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectCourse;
