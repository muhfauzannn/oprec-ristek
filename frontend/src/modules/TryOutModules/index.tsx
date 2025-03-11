"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchDataClient, fetchDataResponse } from "@/lib/fetch";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Enum dan interface
export enum QuestionType {
  MULTIPLE_CHOICE = "multiple_choice",
  MULTIPLE_SELECT = "multiple_select",
  TRUE_FALSE = "true_false",
  SHORT_ANSWER = "short_answer",
}

export interface Choice {
  id: string;
  choices: string;
}

export interface Question {
  id: string;
  question_desc: string;
  type: QuestionType;
  correct_answer: string;
  choices: Choice[];
}

export interface Tryout {
  id: string;
  name: string;
  user_id: string;
  category: string;
  created_at: string;
  updated_at: string;
  duration: number;
  Author: string;
  questions: Question[];
}

const TryoutExam = () => {
  const router = useRouter();
  const { slug } = useParams();
  const [tryout, setTryOut] = useState<Tryout | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // Simpan jawaban user berdasarkan question.id
  const [answers, setAnswers] = useState<{ [key: string]: string | string[] }>(
    {}
  );
  // Timer: misalnya 300 detik (5 menit) untuk demo
  const [remainingTime, setRemainingTime] = useState<number>(0);

  // Fungsi submit, didefinisikan terlebih dahulu
  const handleSubmit = async () => {
    // Di sini Anda bisa memanggil API submit tryout jika diinginkan
    router.push("/home");
    toast.info("Tryout selesai");
    console.log(tryout);
  };

  // Timer countdown
  useEffect(() => {
    if (remainingTime <= 0 && tryout) {
      handleSubmit();
      return;
    }
    const interval = setInterval(() => {
      setRemainingTime((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [remainingTime]);

  // Fetch data tryout berdasarkan slug
  useEffect(() => {
    const fetchData = async () => {
      const response: fetchDataResponse<Tryout> = await fetchDataClient<Tryout>(
        "/tryout/all/" + slug
      );
      if (response.success && response.data) {
        setTryOut(response.data);
        setRemainingTime(response.data.duration);
      }
    };
    fetchData();
  }, [slug]);

  // Navigasi soal
  const navigateToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  // Update jawaban user untuk soal tertentu
  const updateAnswer = (questionId: string, answer: string | string[]) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  if (!tryout) {
    return <div>Loading tryout...</div>;
  }

  const currentQuestion = tryout.questions[currentQuestionIndex];

  const renderQuestionContent = () => {
    if (!currentQuestion) return null;
    switch (currentQuestion.type) {
      case QuestionType.MULTIPLE_SELECT:
        return (
          <div>
            {currentQuestion.choices.map((choice) => {
              const selected: string[] = Array.isArray(
                answers[currentQuestion.id]
              )
                ? (answers[currentQuestion.id] as string[])
                : [];
              return (
                <div key={choice.id} className="flex items-center my-2">
                  <input
                    type="checkbox"
                    checked={selected.includes(choice.choices)}
                    onChange={(e) => {
                      let newAnswer: string[] = [...selected];
                      if (e.target.checked) {
                        newAnswer.push(choice.choices);
                      } else {
                        newAnswer = newAnswer.filter(
                          (c) => c !== choice.choices
                        );
                      }
                      updateAnswer(currentQuestion.id, newAnswer);
                    }}
                  />
                  <span className="ml-2">{choice.choices}</span>
                </div>
              );
            })}
          </div>
        );
      case QuestionType.MULTIPLE_CHOICE:
        return (
          <div>
            {currentQuestion.choices.map((choice) => (
              <div key={choice.id} className="flex items-center my-2">
                <input
                  type="radio"
                  name={currentQuestion.id}
                  checked={answers[currentQuestion.id] === choice.choices}
                  onChange={() =>
                    updateAnswer(currentQuestion.id, choice.choices)
                  }
                />
                <span className="ml-2">{choice.choices}</span>
              </div>
            ))}
          </div>
        );
      case QuestionType.TRUE_FALSE:
        return (
          <div className="flex gap-4">
            <Button
              className="rounded-lg"
              onClick={() => updateAnswer(currentQuestion.id, "True")}
              variant={
                answers[currentQuestion.id] === "True" ? "default" : "secondary"
              }
            >
              True
            </Button>
            <Button
              className="rounded-lg"
              onClick={() => updateAnswer(currentQuestion.id, "False")}
              variant={
                answers[currentQuestion.id] === "False"
                  ? "default"
                  : "secondary"
              }
            >
              False
            </Button>
          </div>
        );
      case QuestionType.SHORT_ANSWER:
        return (
          <div>
            <Input
              placeholder="Masukkan jawaban singkat..."
              value={(answers[currentQuestion.id] as string) || ""}
              onChange={(e) => updateAnswer(currentQuestion.id, e.target.value)}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen max-sm:flex-col-reverse bg-quinary py-40">
      {/* Sidebar Navigasi Soal */}
      <div className="w-[40%] max-sm:w-full p-4 border-r border-tertiary flex flex-col justify-between">
        <div className="mb-4 font-bold flex flex-col items-center">
          <p className="text-center">Waktu Tersisa:</p>
          <p>
            {Math.floor(remainingTime / 3600)}:
            {Math.floor((remainingTime % 3600) / 60)
              .toString()
              .padStart(2, "0")}
            :{(remainingTime % 60).toString().padStart(2, "0")}
          </p>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {tryout.questions.map((q, idx) => (
            <Button
              key={q.id}
              onClick={() => navigateToQuestion(idx)}
              variant={currentQuestionIndex === idx ? "default" : "secondary"}
              className="w-full rounded-lg"
            >
              {idx + 1}
            </Button>
          ))}
        </div>
        <div className="mt-4">
          <Button
            onClick={handleSubmit}
            variant="secondary"
            className="rounded-lg w-full"
          >
            Finish
          </Button>
        </div>
      </div>
      {/* Area Utama Soal */}
      <div className="flex-1 p-4">
        <h2 className="text-2xl font-bold mb-4">
          Soal {currentQuestionIndex + 1} dari {tryout.questions.length}
        </h2>
        <div className="mb-4">
          <p className="text-xl">{currentQuestion.question_desc}</p>
        </div>
        <div>{renderQuestionContent()}</div>
        <div className="flex gap-5 mt-10">
          <Button
            className="rounded-lg"
            onClick={() =>
              setCurrentQuestionIndex((prev) => (prev > 0 ? prev - 1 : prev))
            }
            disabled={currentQuestionIndex === 0}
          >
            Sebelumnya
          </Button>
          <Button
            className="rounded-lg"
            onClick={() =>
              setCurrentQuestionIndex((prev) =>
                prev < tryout.questions.length - 1 ? prev + 1 : prev
              )
            }
            disabled={currentQuestionIndex === tryout.questions.length - 1}
          >
            Berikutnya
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TryoutExam;
