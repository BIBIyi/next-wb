import { Course, CourseShort } from "./course";
import { BaseType, ListResponse, Paginator } from "./index";
export const businessAreas = ["China", "New Zealand", "Canada", "Australia"];
export interface Student<T = CourseShort> {
  id: number;
  name: string;
  updateAt: string;
  country: string;
  ctime: string;
  email: string;
  courses: T[];
  type: BaseType | null;
}
export interface StudentsRequest extends Paginator {
  query?: string;
  userId?: number;
}
export interface StudentsResponse extends ListResponse {
  students: Student[];
}

export interface AddStudentRequest {
  name: string;
  country: string;
  email: string;
  type: number;
}
export type AddStudentResponse = Student;

export interface UpdateStudentRequest extends AddStudentRequest {
  id: number;
}
export type UpdateStudentResponse = Student;
export interface StudentProfile {
  id: number;
  name: string;
  country: string;
  email: string;
  address: string;
  phone: number;
  gender: number;
  education: string;
  age: number;
  interest: string[];
  avatar: string;
  memberStartAt: string;
  memberEndAt: string;
  description: string;
}
