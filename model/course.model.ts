import { Temporal } from "@js-temporal/polyfill";

export interface Course {
  readonly id: string;
  title: string;
  capacity: number;
  startDate?: Temporal.PlainDate;
}


export type CourseStatus = | {
  status: "DRAFT";
  cretedby: string;
  createdAt: Temporal.Instant;
} | {
  status: "PUBLISHED";
  publishedAt: Temporal.Instant;
  syllabus: string;
} | {
  status: "ACTIVE";
  enrolledCount: number;
  startDate: Temporal.PlainDate;
} | {
  status: "ARCHIVED";
  archivedAt: Temporal.Instant;
  finalEnrollmentCount: number;
} | {
  status: "CANCELED";
  reason: string;
  canceledAt: Temporal.Instant;

}

export function describeCourseStatus(status: CourseStatus): string {
  switch (status.status) {
    case "DRAFT":
      return `Course is in draft created by ${status.cretedby} on ${status.createdAt.toString()}`;
    case "PUBLISHED":
      return `Course published on ${status.publishedAt.toString()} with syllabus: ${status.syllabus}`;
    case "ACTIVE":
      return `Course is active with ${status.enrolledCount} students since ${status.startDate.toString()}`;
    case "ARCHIVED":
      return `Course archived on ${status.archivedAt.toString()} with total enrollments: ${status.finalEnrollmentCount}`;
    case "CANCELED":
      return `Course canceled on ${status.canceledAt.toString()} for reason: ${status.reason}`;
  }
}