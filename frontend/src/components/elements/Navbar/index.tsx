"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NavbarData } from "./const";
import { Menu, X, LogIn, SquarePen, ChevronDown } from "lucide-react";
import { useState } from "react";
import useAuth from "@/hooks/useAuth";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const { user } = useAuth();

  return (
    <div className="z-50 bg-primary font-geist h-fit fixed py-5 max-lg:py-4 max-md:py-3 max-sm:py-2 px-20 max-lg:px-14 max-md:px-12 max-sm:px-6 w-full flex justify-between items-center shadow-lg">
      <div className="p-1 rounded-full bg-secondary border border-tertiary">
        <div className="relative w-9 h-9 max-lg:w-8 max-lg:h-8 max-md:w-7 max-md:h-7 max-sm:w-6 max-sm:h-6">
          <Image
            src="/logocontoh.png"
            sizes="none"
            fill
            alt="logo"
            className="object-contain"
          />
        </div>
      </div>

      <div className="max-lg:hidden bg-secondary py-2 px-8 rounded-full border border-tertiary text-white font-geist flex items-center gap-6">
        {NavbarData.map((item, index) => {
          return (
            <Link href={item.link} key={index}>
              <div className="hover:bg-tertiary/10 py-1 px-5 rounded-full duration-300 w-max">
                {item.name}
              </div>
            </Link>
          );
        })}
      </div>
      {user ? (
        <div className="max-lg:hidden cursor-not-allowed bg-secondary flex text-white items-center gap-2 text-lg border border-tertiary px-5 py-2 rounded-full">
          {user.email}
          <ChevronDown className="w-5 h-5 " />
        </div>
      ) : (
        <div className="flex gap-3 max-lg:hidden">
          <Link href="/login">
            <Button className="text-base" size="lg">
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button variant={"secondary"} className="text-base" size="lg">
              Sign Up
            </Button>
          </Link>
        </div>
      )}

      <button
        className="relative hidden max-lg:block cursor-pointer"
        onClick={() => setIsActive(!isActive)}
      >
        {isActive ? (
          <X className="text-tertiary w-9 h-9 max-lg:w-8 max-lg:h-8 max-md:w-7 max-md:h-7 max-sm:w-6 max-sm:h-6" />
        ) : (
          <Menu className="text-tertiary w-9 h-9 max-lg:w-8 max-lg:h-8 max-md:w-7 max-md:h-7 max-sm:w-6 max-sm:h-6" />
        )}
        <div
          className={`absolute duration-300 text-white p-5 ${
            isActive ? "visible opacity-100" : "invisible opacity-0"
          } right-0 top-[130%] bg-secondary/90 rounded-3xl flex flex-col gap-2 border border-tertiary`}
        >
          {NavbarData.map((item, index) => {
            return (
              <Link
                href={item.link}
                className="rounded-lg px-3 py-2 hover:bg-quinary/10 duration-300"
                key={index}
              >
                <div className="w-max">{item.name}</div>
              </Link>
            );
          })}
          {user ? null : (
            <>
              <Link
                href="/"
                className="rounded-lg px-3 py-2 hover:bg-quinary/10 duration-300 flex items-center justify-between"
              >
                <div className="w-max">Login</div>
                <LogIn className="w-5" />
              </Link>
              <Link
                href="/"
                className="rounded-lg px-3 py-2 hover:bg-quinary/10 duration-300 flex items-center justify-between"
              >
                <div className="w-max">Sign Up</div>
                <SquarePen className="w-5" />
              </Link>
            </>
          )}
        </div>
      </button>
    </div>
  );
};
export default Navbar;
