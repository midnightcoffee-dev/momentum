// course.ts
import type { Technology } from "@prisma/client";
import type { ContentType } from "./content";
import type { CourseEnrollment } from "./user";

export interface Course {
  id: string;
  title: string;
  isOpen: boolean;
  publishedAt: Date | null;
  lessons: Lesson[];
  enrollments: CourseEnrollment[];
  technologies: Technology[];
}

export interface Lesson {
  id: string;
  title: string;
  order: number;
  courseId: string;
  contents: Content[];
}

export interface Content {
  id: string;
  type: ContentType;
  data: any; // this is a JSON object, so it could contain any data structure
}
