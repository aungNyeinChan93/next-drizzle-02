"use client";

import React, { useActionState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { registerAction } from "@/features/auth/auth-actions";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

const RegisterForm = () => {
  const [state, formAction] = useActionState(registerAction, undefined);
  if (state?.success) {
    toast.success("register success", { duration: 3000 });
    return redirect("/");
  }
  return (
    <React.Fragment>
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Register Form</CardTitle>
          <CardAction>➕</CardAction>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <div className="mt-3">
              {!state?.success && (
                <p className="text-red-600 text-sm py-1">
                  {state?.errors?.name}
                </p>
              )}
              <Label>Name</Label>
              <Input
                type="text"
                name="name"
                placeholder="enter name"
                className="py-5 mt-2"
              />
            </div>
            <div className="mt-3">
              {!state?.success && (
                <p className="text-red-600 text-sm py-1">
                  {state?.errors?.email}
                </p>
              )}

              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                placeholder="enter email"
                className="py-5 mt-2"
              />
            </div>
            <div className="mt-3">
              {!state?.success && (
                <p className="text-red-600 text-sm py-1">
                  {state?.errors?.password}
                </p>
              )}

              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                placeholder="enter password"
                className="py-5 mt-2"
              />
            </div>
            <div className="mt-5">
              <Button type="submit">Register</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default RegisterForm;
