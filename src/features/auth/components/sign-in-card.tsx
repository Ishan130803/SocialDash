"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { DottedSeparator } from "@/components/DottedSeparator";
import { signIn } from "next-auth/react";
import { useState } from "react";

function SignInCard() {
  const loginWithGoogleHandler = () => {
    signIn("google").catch(()=>{
      setDisabled(false)
    })
    setDisabled(true)
  };
  const [disabled, setDisabled] = useState(false);
  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">Welcome Back!</CardTitle>
      </CardHeader>
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
    </Card>
  );
}

export { SignInCard };
