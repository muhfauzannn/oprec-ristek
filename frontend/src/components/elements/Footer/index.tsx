import Link from "next/link";
import { NavbarData } from "../Navbar/const";
import { Key } from "lucide-react";

const Footer = () => {
  return (
    <div className="w-full pt-20 pb-3 max-lg:py-16 max-md:py-12 max-sm:py-8 px-20 max-lg:px-14 max-md:px-12 max-sm:px-6 bg-secondary border-t border-tertiary rounded-t-[100px] max-lg:rounded-t-4xl flex flex-col gap-10 font-geist">
      <div className="flex justify-between">
        <div></div>
        <div className="flex gap-8">
          <div className="text-white flex flex-col gap-3">
            <h1 className="font-semibold">Menu</h1>
            {NavbarData.map((item, index) => {
              return (
                <Link href={item.link} key={index}>
                  <p className="duration-300 hover:text-tertiary">{item.name}</p>
                </Link>
              );
            })}
          </div>
          <div className="text-white flex flex-col gap-3">
            <h1 className="font-semibold">Account</h1>
            <Link href="/login">
              <p className="duration-300 hover:text-tertiary">Login</p>
            </Link>
            <Link href="/signup">
              <p className="duration-300 hover:text-tertiary">Sign Up</p>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="h-[1px] w-full bg-tertiary"></div>
        <p className="text-tertiary">
          Copyright © 2025 by Fauzan. All right Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
