"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createArticleAction } from "@/features/articles/articles-actions";
import { ServerSession } from "@/features/auth/auth-utils";
import { authClient } from "@/lib/auth-client";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import React, { useActionState, useEffect, useState } from "react";
import toast from "react-hot-toast";

const ArticleCreatePage = () => {
  const [state, formAction] = useActionState(createArticleAction, undefined);
  const [session, setSession] = useState<ServerSession | null>(null);

  useEffect(() => {
    async function session() {
      const { data, error } = await authClient.getSession();
      if (data) {
        setSession(data);
      }
    }
    session();
  }, [setSession]);
  console.log({ session });

  const router = useRouter();

  if (state?.success) {
    toast.success("create success", { duration: 3000 });
    router.push("/articles");
    return;
  }

  return (
    <React.Fragment>
      <main className="w-full min-h-screen flex justify-center items-center">
        <Card className="w-full max-w-xl">
          <CardHeader>
            <CardTitle>Article Create</CardTitle>
            <CardAction>+</CardAction>
          </CardHeader>
          <CardContent>
            <form action={formAction}>
              {!state?.success && (
                <p className="text-red-600 p-1 text-sm">
                  {state?.errors?.other}
                </p>
              )}

              <input
                type="hidden"
                name="author_id"
                value={session && "user" in session ? session.user.id : ""}
              />
              <div className="mt-3">
                {!state?.success && (
                  <p className="text-red-600 p-1 text-sm">
                    {state?.errors?.title}
                  </p>
                )}
                <Label>title</Label>
                <Input
                  type="text"
                  className="my-2"
                  name="title"
                  placeholder="enter title"
                />
              </div>
              <div className="mt-3">
                {!state?.success && (
                  <p className="text-red-600 p-1 text-sm">
                    {state?.errors?.body}
                  </p>
                )}

                <Label>Article Contnet</Label>
                <Textarea
                  name="body"
                  className="my-2 h-50"
                  placeholder="Enter your content"
                />
              </div>
              <div className="mt-5">
                <Button type="submit" variant={"outline"}>
                  Save
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </React.Fragment>
  );
};

export default ArticleCreatePage;
