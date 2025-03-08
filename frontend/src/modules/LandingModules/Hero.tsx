"use client";
import Typical from "react-typical";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="relative h-screen px-20 max-lg:px-14 max-md:px-12 max-sm:px-6">
      <div className="flex max-sm:flex-col-reverse max-sm:gap-10 h-full justify-center items-center">
        <div className="flex flex-col gap-9 text-white">
          <h1 className="text-6xl max-lg:text-5xl max-sm:text-3xl font-bold font-ubuntuSans w-full max-sm:text-center">
            Play, Learn, and
            <br />
            Stay
            <span className="text-tertiary">
              <Typical
                steps={[" Sharp!", 2000, " Smart!", 2000]}
                loop={Infinity}
                wrapper="span"
              />
            </span>
          </h1>
          <p className="font-geist text-base w-100 max-lg:w-90 max-sm:text-center">
            Tired of boring learning? Try our fun and engaging quizzes to boost
            your knowledge while having a great time!
          </p>
          <div className="flex gap-4 font-geist max-sm:justify-center">
            <Button className="py-6 text-base">Get Started</Button>
            <Button
              className="py-6 text-base cursor-not-allowed"
              variant="secondary"
            >
              Watch Demo
            </Button>
          </div>
        </div>
        <div>
          <div className="relative w-120 max-lg:w-100 max-md:w-80 max-sm:w-60 aspect-[1/1]">
            <Image
              src="/hero.png"
              alt="hero"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      </div>

      {/* BACKGROUND */}
      <div className="absolute bottom-0 left-0 w-100 h-100 max-sm:w-50 max-sm:h-50 bg-tertiary rounded-full blur-[300px]"></div>
    </div>
  );
};

export default Hero;
