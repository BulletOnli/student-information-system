"use client";
import React, { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useServerAction } from "zsa-react";
import { signUpAction } from "../../action";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isPending, execute } = useServerAction(signUpAction);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const user = await execute({ email, password });

    console.log(user);
  };

  return (
    <div className="flex items-center justify-center mi bg-background p-10">
      <div className="w-full max-w-md p-8 space-y-3 bg-card text-card-foreground rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full " disabled={isPending}>
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
