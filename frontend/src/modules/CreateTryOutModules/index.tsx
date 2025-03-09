"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { durationOption, categoryOption } from "./const";
import { useState } from "react";

const CreateTryOutModules = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");
  const isValid = name && category && duration;

  

  return (
    <div className="min-h-screen bg-white w-full py-50 max-lg:py-40 flex justify-center text-black">
      <div className="h-fit w-1/2 max-lg:w-[60%] max-md:w-[75%] max-sm:w-[90%] flex flex-col gap-6 max-sm:gap-3 bg-quinary font-ubuntuSans text-3xl font-bold p-10 border border-tertiary rounded-3xl">
        Create A Try Out
        <div>
          <label className="text-sm text-start ml-3">Judul Quiz:</label>
          <Input
            className="bg-white text-black"
            placeholder="Masukan judul quiz..."
            onChange={(e) => setName(e.target.value)}
          ></Input>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-start ml-3">Pilih Kategori:</label>
            <Select onValueChange={(value) => setCategory(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih kategori..." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categoryOption.map((item, index) => (
                    <SelectItem key={index} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm text-start ml-3">Durasi:</label>
            <Select onValueChange={(value) => setDuration(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih durasi..." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {durationOption.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button
          className="py-6 rounded-2xl"
          variant={"secondary"}
          disabled={!isValid}
        >
          Buat Try Out
        </Button>
      </div>
    </div>
  );
};
export default CreateTryOutModules;
