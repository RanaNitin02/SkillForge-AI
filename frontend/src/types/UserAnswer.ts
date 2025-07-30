// src/types/UserAnswer.ts
import { Timestamp } from "firebase/firestore";

export interface UserAnswer {
  id: string;
  mockIdRef: string;
  question: string;
  correct_ans: string;
  user_ans: string;
  feedback: string;
  rating: number;
  userId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
