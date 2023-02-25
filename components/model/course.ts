import { ListResponse, Paginator } from "./index";
export interface CourseType {
  id: number;
  name: string;
}
type CourseStatus = 0 | 1 | 2;
type DurationUnit = 1 | 2 | 3 | 4 | 5;

export interface Course {
  id: number;
  name: string;
  uid: string; //code
  detail: string;
  startTime: string;
  price: number;
  maxStudents: number;
  star: number;
  cover: string;
  teacherName: string;
  teacherId: number;
  ctime: string;
  scheduleId: number;
  type: CourseType[];
  status: CourseStatus;
  duration: number;
  durationUnit: DurationUnit;
}

interface Sales {
  id: number;
  batches: number;
  price: number;
  earnings: number;
  paidAmount: number;
  studentAmount: number;
  paidIds: number[];
}

export interface Schedule {
  id: number;
  status: number;
  current: number;
  chapters: Chapter[];
  classTime: string[];
}

export interface Chapter {
  name: string;
  id: number;
  content: string;
  order: number;
}

export interface CourseDetail extends Course {
  sales: Sales;
  schedule: Schedule;
}
