"use client";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const LoginModules = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isFormValid = email && password.length >= 6;

  return (
    <div className="relative h-screen w-full flex flex-row-reverse">
      <div className="relative p-10 max-sm:p-6 w-1/2 max-md:w-full bg-quinary flex flex-col justify-center gap-5">
        <div className="flex justify-between items-center">
          <h1 className="w-fit font-ubuntuSans font-bold text-3xl">Sign In</h1>
          <div className="relative w-10 h-10">
            <Image
              src="/logocontoh.png"
              alt="hero"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
        <form className="flex flex-col gap-3">
          <div>
            <label className="ml-2 text-sm">Email</label>
            <Input
              placeholder="fauzan@example.com"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="ml-2 text-sm">Password</label>
            <Input
              placeholder="Enter your password..."
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            variant={"secondary"}
            className="py-6 mt-2 rounded-2xl text-base"
            disabled={!isFormValid}
          >
            Login
          </Button>
        </form>
        <div className="absolute bg-quinary w-full h-[10%] bottom-[-10%] left-0"></div>
      </div>
      {/* Background */}
      <div className="absolute max-md:hidden left-0 top-0 blur-[300px] w-80 h-80 rounded-full bg-tertiary"></div>
    </div>
  );
};
export default LoginModules;
