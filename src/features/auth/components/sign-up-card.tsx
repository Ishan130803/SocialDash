"use client";
import { DottedSeparator } from "@/components/DottedSeparator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
// import { FcGoogle } from "react-icons/fc";
// import { FaGithub } from "react-icons/fa";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { signUpSchema } from "../schema";
import { useState } from "react";
import { toast } from "sonner";
import { client } from "@/lib/rpc";

function SignUpCard() {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    try {
      setDisabled(true);
      const res = await client.api.user.register.$post({ json: values });
      const message = await res.text();
      if (!res.ok) {
        throw new Error(message);
      }
      toast.success("Registered Successfully");
      form.reset();
      setDisabled(false);
      const args = [
        "credentials",
        {
          email: values.email,
          password: values.password,
          redirect: false,
        },
      ];
      await client.api.user.login.$post({ json: args });
    } catch (error: any) {
      console.error(error);
      setDisabled(false);
      toast.error(error.message);
    }
  };

  const [disabled, setDisabled] = useState(false);
  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">Sign Up</CardTitle>
      </CardHeader>
      <div className="px-7 mb-2">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your name"
                      {...field}
                    ></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              Register
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      {/* <CardContent className="p-7 flex flex-col gap-y-4">
        <Button
          variant={"secondary"}
          size={"lg"}
          className="w-full"
          disabled={disabled}
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
      </div> */}
      <div className="p-7  flex items-center justify-center">
        <p>
          Already have an account?
          <Link href="/sign-in" className="text-blue-700">
            &nbsp;Sign In
          </Link>
        </p>
      </div>
    </Card>
  );
}

export { SignUpCard };
