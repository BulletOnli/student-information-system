"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { signIn } from "next-auth/react";
import { PasswordInput } from "@/components/PasswordInput";
import { signInSchema } from "@/lib/zod";

type FormValues = z.infer<typeof signInSchema>;

const LoginForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const isError = searchParams.get("error") === "CredentialsSignin";

  const form = useForm<FormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    signIn("credentials", values);
  }

  return (
    <Card className="w-full max-w-xl rounded-2xl  p-4">
      <CardHeader>
        <CardTitle className="text-center text-xl font-bold">
          GJC Student Portal
        </CardTitle>
        {/* <CardDescription>
          Enter your credentials to access your account.
        </CardDescription> */}
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="ID or Email"
                      {...field}
                      className="py-6 px-4 text-base bg-gray-200 border-none outline-none rounded-xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PasswordInput
                      {...field}
                      placeholder="Password"
                      className="py-6 px-4 text-base bg-gray-200 border-none outline-none rounded-xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isError && (
              <div className="flex items-center space-x-2 text-red-600">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">Invalid Email or Password</span>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="bg-darkGreen hover:bg-darkGreen/90 px-8 text-base rounded-xl mx-auto w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default LoginForm;
