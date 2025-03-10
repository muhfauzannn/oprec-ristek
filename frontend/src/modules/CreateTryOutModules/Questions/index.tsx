"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Card from "./Card";
import { verifyQuestions } from "./verifyAnswer";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { fetchDataClient } from "@/lib/fetch";

export enum QuestionType {
  MULTIPLE_CHOICE = "multiple_choice",
  MULTIPLE_SELECT = "multiple_select",
  TRUE_FALSE = "true_false",
  SHORT_ANSWER = "short_answer",
}

export interface Choices {
  choices: string;
  is_correct: boolean;
}

export interface Question {
  question_desc: string;
  type: QuestionType;
  // correct_answer hanya digunakan untuk short_answer atau true_false
  correct_answer: string;
  // Untuk multiple_choice/multiple_select, pilihan disimpan di sini
  choices: Choices[];
}

const CreateQuestions = () => {
  const router = useRouter();
  const { slug } = useParams();
  const [questions, setQuestions] = useState<Question[]>([
    {
      question_desc: "",
      type: QuestionType.MULTIPLE_CHOICE,
      correct_answer: "",
      choices: [{ choices: "", is_correct: false }],
    },
  ]);

  const appendQuestion = () => {
    setQuestions([
      ...questions,
      {
        question_desc: "",
        type: QuestionType.MULTIPLE_CHOICE,
        correct_answer: "",
        choices: [{ choices: "", is_correct: false }],
      },
    ]);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const updateQuestion = (index: number, updatedQuestion: Question) => {
    const newQuestions = [...questions];
    newQuestions[index] = updatedQuestion;
    setQuestions(newQuestions);
  };
  const handleClick = () => {
    console.log(questions);
    const isValid: boolean = verifyQuestions(questions);
    if (isValid) {
      // Kirim data ke backend
      const toastLoading = toast.loading("Menyimpan pertanyaan...");
      fetchDataClient<null>("/question/" + slug, {
        method: "POST",
        body: JSON.stringify({
          id: slug,
          question: questions,
        }),
      }).then((response) => {
        toast.dismiss(toastLoading);
        if (response.success) {
          toast.success(response.message || "Pertanyaan berhasil disimpan");
          router.push("/home");
        } else {
          toast.error(response.message || "Gagal menyimpan pertanyaan");
        }
      });
    }
  };

  return (
    <div className="bg-white py-50 max-lg:py-40 max-md:py-30 flex flex-col gap-10 items-center">
      <div className="w-1/2 max-lg:w-[60%] max-md:w-[75%] max-sm:w-[90%] flex justify-between items-center max-sm:flex-col max-sm:gap-3 max-sm:items-start">
        <h1 className="text-center w-fit text-4xl max-lg:text-3xl max-md:text-2xl max-sm:text-xl font-ubuntuSans font-bold">
          Tambahkan Pertanyaan
        </h1>
        <Button
          className="py-3 rounded-lg"
          variant={"secondary"}
          onClick={handleClick}
        >
          <Save />
          Simpan Pertanyaan
        </Button>
      </div>
      <div className="w-1/2 max-lg:w-[70%] max-md:w-[75%] max-sm:w-[90%]">
        <div className="flex flex-col gap-4">
          {questions.map((q, index) => (
            <Card
              key={index}
              index={index}
              question={q}
              onQuestionChange={updateQuestion}
              onRemove={removeQuestion}
            />
          ))}
          <Button
            variant={"secondary"}
            className="py-6 rounded-lg"
            onClick={appendQuestion}
          >
            Tambah Pertanyaan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateQuestions;
