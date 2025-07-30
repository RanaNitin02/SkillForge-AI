// src/types/Interview.ts
import { Timestamp } from "firebase/firestore";

export interface Interview {
  id: string;
  position: string;
  description: string;
  experience: number;
  userId: string;
  techStack: string;
  questions: { question: string; answer: string }[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
