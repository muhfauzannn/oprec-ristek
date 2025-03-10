enum QuestionType {
  MULTIPLE_CHOICE = 'multiple_choice',
  MULTIPLE_SELECT = 'multiple_select',
  TRUE_FALSE = 'true_false',
  SHORT_ANSWER = 'short_answer',
}

interface Choices {
  choices: string;
  is_correct: boolean;
}

interface Question {
  question_desc: string;
  type: QuestionType;
  // correct_answer hanya digunakan untuk short_answer atau true_false
  correct_answer: string;
  // Untuk multiple_choice/multiple_select, pilihan disimpan di sini
  choices: Choices[];
}

export class InsertTryOut {
  id: string;
  question: Question[];
}
