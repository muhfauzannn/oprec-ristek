"use client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categoryOption } from "../CreateTryOutModules/const";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import Card from "./Card";
import { useState, useEffect } from "react";
import { Quiz } from "./const";
import { fetchDataClient, fetchDataResponse } from "@/lib/fetch";
import { toast } from "sonner";
import useAuth from "@/hooks/useAuth";

const HomeModules = () => {
  const [quiz, setQuiz] = useState<Quiz[]>([]);
  const [originalQuiz, setOriginalQuiz] = useState<Quiz[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [timeOrder, setTimeOrder] = useState("newest"); // "newest" atau "oldest"
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filterType, setFilterType] = useState("all"); // "all" atau "me"
  const [loading, setLoading] = useState(false);
  const dataAuth = useAuth();
  const userId = dataAuth.user?.userId;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response: fetchDataResponse<Quiz[]> = await fetchDataClient<Quiz[]>(
        "/tryout"
      );
      if (response.success && response.data) {
        setQuiz(response.data);
        setOriginalQuiz(response.data);
      } else {
        toast.error(response.message || "Gagal mengambil data tryout");
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  // Fungsi untuk menerapkan filter pada data asli dan meng-update state quiz
  const applyFilter = () => {
    let filtered = [...originalQuiz];

    // Filter berdasarkan search query (contoh: cari di nama tryout)
    if (searchQuery) {
      filtered = filtered.filter((q) =>
        q.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter berdasarkan kategori (jika dipilih)
    if (selectedCategory) {
      filtered = filtered.filter((q) => q.category === selectedCategory);
    }

    // Filter berdasarkan tipe: jika "me", hanya tampilkan tryout yang dibuat oleh user saat ini.
    // Misalnya, userId disimpan di localStorage saat login.
    if (filterType === "me") {
      const currentUserId = userId || "";
      if (currentUserId) {
        filtered = filtered.filter((q) => q.user_id === currentUserId);
      }
    }

    // Urutkan berdasarkan waktu: newest (terbaru) atau oldest (terlama)
    filtered.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return timeOrder === "newest"
        ? dateB.getTime() - dateA.getTime()
        : dateA.getTime() - dateB.getTime();
    });

    setQuiz(filtered);
  };

  return (
    <div className="min-h-screen w-full py-30 bg-white px-20 max-lg:px-14 max-md:px-12 max-sm:px-6 flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        {/* Search Input */}
        <div className="flex gap-3 items-center">
          <Input
            placeholder="Cari tryout..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="text-tertiary" />
        </div>

        {/* Filter Selects */}
        <div className="grid grid-cols-4 gap-5">
          {/* Filter berdasarkan waktu */}
          <div className="w-full">
            <Select onValueChange={(value) => setTimeOrder(value)}>
              <SelectTrigger className="w-full py-2">
                <SelectValue placeholder="Pilih berdasarkan waktu..." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="newest">Terbaru</SelectItem>
                  <SelectItem value="oldest">Terlama</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {/* Filter berdasarkan kategori */}
          <div className="w-full">
            <Select onValueChange={(value) => setSelectedCategory(value)}>
              <SelectTrigger className="w-full py-2">
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
          {/* Filter berdasarkan siapa yang membuat */}
          <div className="w-full">
            <Select onValueChange={(value) => setFilterType(value)}>
              <SelectTrigger className="w-full py-2">
                <SelectValue placeholder="Tampilkan..." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">Semuanya</SelectItem>
                  <SelectItem value="me">Dibuat oleh saya</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {/* Tombol Terapkan Filter */}
          <div className="w-full">
            <Button
              onClick={applyFilter}
              className="rounded-lg"
              variant={"secondary"}
            >
              <SlidersHorizontal />
              Terapkan Filter
            </Button>
          </div>
        </div>

        {/* Tampilan tryout */}
        <div className="mt-8 grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-4">
          {quiz.map((q, index) => (
            <Card
              key={index}
              id={q.id}
              title={q.name}
              category={q.category}
              date={q.created_at}
              author={q.Author}
              duration={q.duration}
            />
          ))}
          {loading && <div className="text-2xl font-bold">Loading...</div>}
        </div>
      </div>
    </div>
  );
};

export default HomeModules;
