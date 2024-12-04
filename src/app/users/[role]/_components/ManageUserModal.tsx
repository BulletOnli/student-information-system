"use client";
import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil, PlusCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DEFAULT_PASSWORD_INPUT,
  DEPARTMENTS,
  POSITIONS,
  ROLES,
  SECTIONS,
  YEAR_LEVELS,
} from "@/constants";
import { useServerAction } from "zsa-react";
import { createUserAction, updateUserAction } from "../../action";
import { userSchema } from "@/lib/zod";
import { toast } from "@/hooks/use-toast";
import SelectCourse from "@/components/SelectCourse";
import { UserRole } from "@prisma/client";
import { PasswordInput } from "@/components/PasswordInput";
import { generateEmail } from "@/lib/utils";

type UserDefaults = {
  student?: {
    course: { id: string };
    yearLevel: number;
    section: string;
  };
  faculty?: {
    department: string;
    position: string;
  };
};

type RoleDefaults = {
  student: (
    defaults: NonNullable<UserDefaults["student"]>
  ) => Record<string, any>;
  faculty: (
    defaults: NonNullable<UserDefaults["faculty"]>
  ) => Record<string, any>;
};

const formatRoleDefaults: RoleDefaults = {
  student: (defaults) => ({
    courseId: defaults.course.id,
    yearLevel: String(defaults.yearLevel),
    section: defaults.section,
  }),

  faculty: (defaults) => ({
    department: defaults.department,
    position: defaults.position,
  }),
};

const getDefaultValues = (
  role: UserRole | undefined,
  defaultValues: Props["defaultValues"]
) => {
  if (!defaultValues) {
    return { role: role || UserRole.ADMIN, password: DEFAULT_PASSWORD_INPUT };
  }

  const roleKey = role?.toLowerCase() as keyof RoleDefaults;
  if (!roleKey || !formatRoleDefaults[roleKey]) {
    return defaultValues;
  }

  const roleDefaults = defaultValues[roleKey];
  if (!roleDefaults) {
    return defaultValues;
  }

  return {
    ...defaultValues,
    ...formatRoleDefaults[roleKey](roleDefaults),
  };
};

type Props = {
  role?: "STUDENT" | "FACULTY" | "ADMIN";
  defaultValues?: any;
  courseId?: string;
};

const ManageUserModal = ({ role, courseId, defaultValues }: Props) => {
  const [open, setOpen] = useState(false);
  const { execute, isPending } = useServerAction(
    defaultValues ? updateUserAction : createUserAction
  );

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      ...getDefaultValues(role, defaultValues),
      ...(courseId && { courseId }),
      ...(defaultValues?.password && { password: defaultValues.password }), // Don't show password if it's already set
    },
  });

  const onSubmit = async (values: z.infer<typeof userSchema>) => {
    const updatedValues = defaultValues
      ? { ...values, userId: defaultValues.id }
      : values;

    const [data, err] = await execute(updatedValues);
    if (err) {
      console.error(err);
      if (err.message.includes("Email")) {
        form.setError("email", { message: err.message });
      }
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
      return;
    }

    setOpen(false);
    form.reset();
    toast({
      title: defaultValues ? "User updated successfully" : "User created",
      description: `User has been ${
        defaultValues ? "updated" : "created"
      } successfully.`,
    });
  };

  const isStudent = form.watch("role") === "STUDENT" || role === "STUDENT";
  const isFaculty = form.watch("role") === "FACULTY" || role === "FACULTY";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          {defaultValues ? (
            <Pencil className="size-4" />
          ) : (
            <PlusCircle className="mr-1 size-4" />
          )}
          {!defaultValues && "Add User"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new User</DialogTitle>
          <DialogDescription>
            Add a new User. Fill in all the required information.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div className="w-full grid grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          const email = generateEmail(
                            e.target.value,
                            form.getValues("lastName")
                          );
                          form.setValue("email", email);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          const email = generateEmail(
                            form.getValues("firstName"),
                            e.target.value
                          );
                          form.setValue("email", email);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} readOnly />
                  </FormControl>
                  <FormDescription>
                    This email is automatically generated based on your name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {!defaultValues?.password && (
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} readOnly={defaultValues} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={defaultValues || role !== undefined}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ROLES.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isStudent && <StudentFields form={form} />}
            {isFaculty && <FacultyFields form={form} />}

            <Button type="submit" className="w-full" disabled={isPending}>
              {defaultValues ? "Update User" : "Create User"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

type FieldProps = {
  form: UseFormReturn<any, any, undefined>;
};

const StudentFields = ({ form }: FieldProps) => {
  return (
    <>
      <div className="w-full grid grid-cols-3 gap-2">
        <FormField
          control={form.control}
          name="courseId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course</FormLabel>
              <SelectCourse {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="yearLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year Level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {YEAR_LEVELS?.map((year) => (
                    <SelectItem key={year} value={year?.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="section"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Section</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select section" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {SECTIONS?.map((section) => (
                    <SelectItem key={section} value={section}>
                      {section}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};

const FacultyFields = ({ form }: FieldProps) => {
  return (
    <>
      <div className="w-full grid grid-cols-2 gap-2">
        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {DEPARTMENTS.map((department) => (
                    <SelectItem key={department} value={department}>
                      {department}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Position" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {POSITIONS?.map((position) => (
                      <SelectItem key={position} value={position}>
                        {position}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};

export default ManageUserModal;
