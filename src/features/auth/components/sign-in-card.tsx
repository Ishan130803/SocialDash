"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { DottedSeparator } from "@/components/DottedSeparator";
import { useState } from "react";
import { z } from "zod";
import { loginSchema } from "../schema";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { toast } from "sonner";
import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";
import { nextAuthSignInAPI } from "../actions";
import { type signIn } from "@/lib/auth";

function SignInCard() {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setDisabled(true);
    try {
      const args: Parameters<typeof signIn> = [
        "credentials",
        {
          email: values.email,
          password: values.password,
          redirect: false,
        },
      ];

      const res = await client.api.user.login.$post({ json: args });
      if (!res.ok) {
        const message = await res.text();
        throw new Error(message);
      }
      toast.success("Logged In");
      router.replace("/dashboard")
    } catch {
      toast.error("Incorrect username or password");
    } finally {
      setDisabled(false);
      // router.refresh();
    }
  };

  const [disabled, setDisabled] = useState(false);


  const loginWithGoogleHandler = async () => {
    setDisabled(true)
    await nextAuthSignInAPI('google')
    setDisabled(false)

  }
  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">Welcome Back!</CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter email address"
                      {...field}
                    ></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter password"
                      {...field}
                    ></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type={"submit"}
              disabled={disabled}
              size={"lg"}
              className="w-full"
            >
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7 flex flex-col gap-y-4">
        <Button
          variant={"secondary"}
          size={"lg"}
          className="w-full"
          disabled={disabled}
          onClick={loginWithGoogleHandler}
        >
          <FcGoogle className="mr-2 size-5" />
          Login with Google
        </Button>
        <Button
          variant={"secondary"}
          size={"lg"}
          className="w-full"
          disabled={disabled}
        >
          <FaGithub className="mr-2 size-5"></FaGithub>
          Login with Github
        </Button>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <div className="p-7  flex items-center justify-center">
        <p>
          Don&apos;t have an account?
          <Link href="/sign-up" className="text-blue-700">
            &nbsp;Sign Up
          </Link>
        </p>
      </div>
    </Card>
  );
}

export { SignInCard };
