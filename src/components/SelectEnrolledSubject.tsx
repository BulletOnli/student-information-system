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
import { Subject } from "@prisma/client";

type SelectProps = {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  disabled?: boolean;
  name?: string;
  studentId: string;
};

type ResponseType = {
  id: string;
  studentId: string;
  subject: Subject;
  subjectId: string;
};

const SelectSubject = ({
  value,
  onChange,
  onBlur,
  disabled,
  name,
  studentId,
}: SelectProps) => {
  const subjectQuery = useQuery<ResponseType[]>({
    queryKey: [studentId, "enrolled subjects"],
    queryFn: async () => {
      const response = await axios.get(
        `/api/user/students/${studentId}/subjects`
      );
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
          <SelectValue placeholder="Select subject" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {subjectQuery.isLoading && (
          <SelectItem value="test" disabled>
            Loading...
          </SelectItem>
        )}

        {subjectQuery.data?.length === 0 && (
          <SelectItem value="test" disabled>
            NO AVAILABLE SUBJECTS
          </SelectItem>
        )}

        {subjectQuery.data?.map(({ subject, id: enrolledSubjectId }) => (
          <SelectItem key={subject.id} value={enrolledSubjectId}>
            {subject.code} ~ {subject.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectSubject;
