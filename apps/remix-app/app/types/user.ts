export interface User {
  id: string;
  email: string;
  password: string; // remember to hash passwords for security
  firstName: string;
  lastName: string;
  role: Role;
  courses: CourseEnrollment[];
}

export enum Role {
  USER = "USER",
  INSTRUCTOR = "INSTRUCTOR",
  ADMIN = "ADMIN",
}

export interface CourseEnrollment {
  id: string;
  userId: string;
  courseId: string;
  createdAt: Date;
}
