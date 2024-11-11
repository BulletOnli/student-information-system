import { signIn } from "@/auth";
import React from "react";

const SignInForm = () => {
  return (
    <form
      action={async (formData) => {
        "use server";

        await signIn("credentials", formData);
      }}
    >
      <label>
        Username
        <input name="email" type="text" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <button>Sign In</button>
    </form>
  );
};

export default SignInForm;
