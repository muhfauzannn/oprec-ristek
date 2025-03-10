import Link from "next/link";
import { NavbarData } from "../Navbar/const";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { socMed, accountData } from "./const";

const Footer = () => {
  return (
    <div className="relative w-full pt-20 pb-3 max-sm:pb-1 max-lg:py-16 max-md:py-12 max-sm:py-8 px-20 max-lg:px-14 max-md:px-12 max-sm:px-6 bg-secondary border-t border-tertiary rounded-t-[100px] max-lg:rounded-t-4xl flex flex-col gap-10 font-geist overflow-hidden">
      <div className="z-10 flex max-sm:flex-col max-sm:gap-8 justify-between">
        <div className="flex h-full flex-col max-sm:items-center gap-7 max-lg:gap-6 max-md:gap-5 max-sm:gap-4">
          <div className="flex items-center gap-1">
            <div className="relative w-10 h-10 max-lg:w-9 max-lg:h-9 max-md:w-8 max-md:h-8 max-sm:w-7 max-sm:h-7">
              <Image
                src="/logocontoh.png"
                alt="logo"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <p className="text-tertiary font-semibold text-3xl tracking-widest">
              FAUZAN
            </p>
          </div>
          <div className="flex gap-5">
            <Button className="py-6 cursor-not-allowed">Start Try Out</Button>
            <Button variant={"secondary"} className="py-6 cursor-not-allowed">
              Watch Demo
            </Button>
          </div>
          <div className="flex gap-6">
            {socMed.map((item, index) => {
              return (
                <Link href={item.link} key={index}>
                  {item.componen}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="flex gap-8 max-sm:flex-col max-sm:hidden">
          <div className="text-white flex flex-col gap-3 max-sm:flex-row">
            <h1 className="font-semibold">Menu</h1>
            {NavbarData.map((item, index) => {
              return (
                <Link href={item.link} key={index}>
                  <p className="duration-300 hover:text-tertiary">
                    {item.name}
                  </p>
                </Link>
              );
            })}
          </div>
          <div className="text-white flex flex-col gap-3 max-sm:flex-row">
            <h1 className="font-semibold">Account</h1>
            {accountData.map((item, index) => {
              return (
                <Link href={item.link} key={index}>
                  <p className="duration-300 hover:text-tertiary">
                    {item.name}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <div className="z-10 flex flex-col gap-5">
        <div className="h-[1px] w-full bg-tertiary"></div>
        <p className="text-tertiary text-sm max-sm:text-xs">
          Copyright © 2025 by Fauzan. All right Reserved
        </p>
      </div>

      {/* BACKGROUND */}
      <div className="z-[0] right-0 translate-x-[50%] absolute w-100 h-100 max-lg:w-60 max-lg:h-60 bg-tertiary rounded-full blur-[300px]"></div>
    </div>
  );
};

export default Footer;
