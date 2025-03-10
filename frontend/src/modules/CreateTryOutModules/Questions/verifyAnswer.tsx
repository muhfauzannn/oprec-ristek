import { Question, QuestionType } from "./index";
import { toast } from "sonner";

export const verifyQuestions = (questions: Question[]) => {
  // toast("TERKLIK")
  let hasError = false;
  if (questions.length === 0) {
    toast.error("Minimal memiliki 1 pertanyaan");
    hasError = true;
  }
  questions.forEach((q, index) => {
    if (q.question_desc === "") {
      toast.error("Pertanyaan " + (index + 1) + " tidak boleh kosong");
      hasError = true;
    } else if (q.type === QuestionType.MULTIPLE_CHOICE) {
      const correctAnswer = q.choices.filter((c) => c.is_correct);
      if (correctAnswer.length === 0) {
        toast.error(
          "Pertanyaan " + (index + 1) + " tidak memiliki jawaban benar"
        );
        hasError = true;
      }
      q.choices.forEach((c) => {
        if (c.choices === "") {
          toast.error(
            "Pilihan jawaban pada pertanyaan " +
              (index + 1) +
              " tidak boleh kosong"
          );
          hasError = true;
        }
      });
    } else if (q.type === QuestionType.MULTIPLE_SELECT) {
      const correctAnswer = q.choices.filter((c) => c.is_correct);
      if (correctAnswer.length === 0) {
        toast.error(
          "Pertanyaan " + (index + 1) + " tidak memiliki jawaban benar"
        );
        hasError = true;
      }
      q.choices.forEach((c) => {
        if (c.choices === "") {
          toast.error(
            "Pilihan jawaban pada pertanyaan " +
              (index + 1) +
              " tidak boleh kosong"
          );
          hasError = true;
        }
      });
    } else if (q.type === QuestionType.SHORT_ANSWER) {
      if (q.correct_answer === "") {
        toast.error(
          "Jawaban pada pertanyaan " + (index + 1) + " tidak boleh kosong"
        );
        hasError = true;
      }
    }
  });
  if (!hasError) {
    return true;
  }
  return false;
};
