"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { durationOption, categoryOption } from "./const";
import { useState } from "react";
import { fetchDataClient, fetchDataResponse } from "@/lib/fetch";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CreateTryOutModules = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");
  const isValid = name && category && duration;

  const handleSubmit = async () => {
    const durationInteger = parseInt(duration);
    const toastLoading = toast.loading("Loading...");
    // Panggil fungsi fetchDataClient
    const result: fetchDataResponse<string> = await fetchDataClient<string>(
      "/tryout",
      {
        method: "POST",
        body: JSON.stringify({
          name,
          category,
          duration: durationInteger,
        }),
      }
    );
    toast.dismiss(toastLoading);
    if (result.success) {
      toast.success(result.message || "Tryout berhasil dibuat");
      router.push(`/question/${result.data}`);
    } else {
      toast.error(result.message || "Gagal membuat tryout");
    }
  };

  return (
    <div className="min-h-screen bg-white w-full py-50 max-lg:py-40 flex justify-center text-black">
      <div className="h-fit w-1/2 max-lg:w-[60%] max-md:w-[75%] max-sm:w-[90%] flex flex-col gap-6 max-sm:gap-3 bg-quinary font-ubuntuSans text-3xl font-bold p-10 border border-tertiary rounded-3xl">
        Create A Try Out
        <div>
          <label className="ml-2 text-sm">Judul Quiz:</label>
          <Input
            className="bg-white text-black"
            placeholder="Masukan judul quiz..."
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="ml-2 text-sm">Pilih Kategori:</label>
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
            <label className="ml-2 text-sm">Durasi:</label>
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
          onClick={handleSubmit}
        >
          Buat Try Out
        </Button>
      </div>
      {/* Background */}
      <div className="absolute max-md:hidden left-0 top-0 blur-[300px] w-80 h-80 rounded-full bg-tertiary"></div>
    </div>
  );
};

export default CreateTryOutModules;
