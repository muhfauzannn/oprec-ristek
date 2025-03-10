"use client";
import React from "react";
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
import { QuestionType, Question, Choices } from "./index";
import { questionType } from "./const"; //
import { Trash2 } from "lucide-react";

interface CardProps {
  index: number;
  question: Question;
  onQuestionChange: (index: number, updatedQuestion: Question) => void;
  onRemove: (index: number) => void;
}

const Card: React.FC<CardProps> = ({
  index,
  question,
  onQuestionChange,
  onRemove,
}) => {
  // Update teks pertanyaan
  const handleQuestionDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onQuestionChange(index, { ...question, question_desc: e.target.value });
  };

  // Update tipe pertanyaan
  const handleTypeChange = (value: string) => {
    let updatedChoices = question.choices;
    let updatedCorrectAnswer = question.correct_answer;
    if (value === QuestionType.TRUE_FALSE) {
      // Untuk true_false, gunakan dua tombol dan kosongkan choices
      updatedChoices = [];
      updatedCorrectAnswer = "True"; // default bisa diset, nanti diubah lewat tombol
    } else if (value === QuestionType.SHORT_ANSWER) {
      // Untuk short_answer, tidak ada pilihan, gunakan correct_answer
      updatedChoices = [];
      updatedCorrectAnswer = "";
    } else {
      // Untuk multiple_choice/multiple_select,
      // jika belum ada pilihan, buat satu pilihan kosong
      if (!question.choices || question.choices.length === 0) {
        updatedChoices = [{ choices: "", is_correct: false }];
      }
    }
    onQuestionChange(index, {
      ...question,
      type: value as QuestionType,
      choices: updatedChoices,
      correct_answer: updatedCorrectAnswer,
    });
  };

  // Untuk tipe multiple_choice/multiple_select: update input pilihan
  const handleChoiceChange = (
    choiceIndex: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newChoices: Choices[] = question.choices.map((choice, idx) =>
      idx === choiceIndex ? { ...choice, choices: e.target.value } : choice
    );
    onQuestionChange(index, { ...question, choices: newChoices });
  };

  // Untuk tipe multiple_choice/multiple_select: update checkbox untuk is_correct
  const handleCheckboxChange = (choiceIndex: number, checked: boolean) => {
    let newChoices: Choices[];
    if (question.type === QuestionType.MULTIPLE_CHOICE) {
      // Hanya satu checkbox yang bisa aktif
      newChoices = question.choices.map((choice, idx) => ({
        ...choice,
        is_correct: idx === choiceIndex ? checked : false,
      }));
    } else {
      // Untuk multiple_select, allow multiple true
      newChoices = question.choices.map((choice, idx) =>
        idx === choiceIndex ? { ...choice, is_correct: checked } : choice
      );
    }
    onQuestionChange(index, { ...question, choices: newChoices });
  };

  // Untuk multiple_choice/multiple_select: tambah pilihan baru
  const addChoice = () => {
    onQuestionChange(index, {
      ...question,
      choices: [...question.choices, { choices: "", is_correct: false }],
    });
  };

  // Untuk true_false: tangani pemilihan tombol
  const handleTrueFalseSelection = (selected: "True" | "False") => {
    onQuestionChange(index, { ...question, correct_answer: selected });
  };

  // Untuk short_answer: update input correct_answer
  const handleShortAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onQuestionChange(index, { ...question, correct_answer: e.target.value });
  };

  return (
    <div className="bg-quinary border-l-6 border-tertiary rounded-sm p-6 max-lg:p-5 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl max-lg:text-lg max-md:text-base font-ubuntuSans font-semibold">
          Pertanyaan {index + 1}
        </h1>
        <button
          onClick={() => onRemove(index)}
          className=" flex justify-center items-center cursor-pointer"
        >
          <Trash2 className="text-secondary w-5 h-5" />
        </button>
      </div>
      <div className="grid grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] gap-4">
        <Input
          placeholder="Masukan Pertanyaan"
          value={question.question_desc}
          onChange={handleQuestionDescChange}
        />
        <Select onValueChange={handleTypeChange}>
          <SelectTrigger className="w-full py-6 rounded-lg">
            <SelectValue placeholder="Pilih tipe pertanyaan..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {questionType.map((item, idx) => (
                <SelectItem key={idx} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {(question.type === QuestionType.MULTIPLE_CHOICE ||
        question.type === QuestionType.MULTIPLE_SELECT) && (
        <div className="flex flex-col gap-2">
          <h2 className="font-bold">Pilihan Jawaban:</h2>
          {question.choices.map((choice, cIndex) => (
            <div key={cIndex} className="flex items-center gap-2">
              <Input
                placeholder={`Pilihan ${cIndex + 1}`}
                value={choice.choices}
                onChange={(e) => handleChoiceChange(cIndex, e)}
              />
              <Input
                type="checkbox"
                className="w-4 h-4"
                checked={choice.is_correct}
                onChange={(e) => handleCheckboxChange(cIndex, e.target.checked)}
              />
            </div>
          ))}
          <Button
            onClick={addChoice}
            className="w-fit py-4 rounded-lg self-center"
          >
            + Tambah Pilihan
          </Button>
        </div>
      )}
      {question.type === QuestionType.TRUE_FALSE && (
        <div className="flex flex-col gap-2">
          <h2 className="font-bold">Pilih Jawaban Benar:</h2>
          <div className="flex gap-4">
            <Button
              onClick={() => handleTrueFalseSelection("True")}
              variant={"secondary"}
              className={`rounded-lg ${
                question.correct_answer === "True"
                  ? ""
                  : "bg-quinary text-black"
              }`}
            >
              True
            </Button>
            <Button
              onClick={() => handleTrueFalseSelection("False")}
              variant={"secondary"}
              className={`rounded-lg ${
                question.correct_answer === "False"
                  ? ""
                  : "bg-quinary text-black"
              }`}
            >
              False
            </Button>
          </div>
        </div>
      )}
      {question.type === QuestionType.SHORT_ANSWER && (
        <div className="flex flex-col gap-2">
          <h2 className="font-bold">Jawaban Benar:</h2>
          <Input
            placeholder="Masukkan jawaban singkat..."
            value={question.correct_answer}
            onChange={handleShortAnswerChange}
          />
        </div>
      )}
      {/* Tombol untuk menghapus pertanyaan */}
      {/* <div className="flex justify-end">
        <Button
          onClick={() => onRemove(index)}
          variant={"destructive"}
          className="mt-4"
        >
          Hapus Pertanyaan
        </Button>
      </div> */}
    </div>
  );
};

export default Card;
