import { Temporal } from "@js-temporal/polyfill";
export interface enrollementRecord {
  readonly studentid: string;
  readonly courseCode: string;
  enrolledAt: Temporal.Instant;
}

export type EnrollmentStatus = {
  status: "PENDING";
  requestedAT: Temporal.Instant;
  studentid: string;
  courseid: string;
} |
{
  status: "APPROVED";
  approvedby: string;
  approvedAt: Temporal.Instant;

} | {
  status: "active";
  startDate: Temporal.PlainDate;
  currentGrade?: number;
} | {
  status: "COMPLITED";
  finalGrade: number;
  copletedAt: Temporal.Instant;

} | {
  status: "DROPPED";
  reason: string;
  droppedAt: Temporal.Instant;
}

export function describeEnrollment(enrolment: EnrollmentStatus): string {
  switch (enrolment.status) {
    case "PENDING":
      return `Awaiting approval since ${enrolment.requestedAT.toString()}`;
    case "APPROVED":
      return `Approved by ${enrolment.approvedby} on ${enrolment.approvedAt.toString()}`;
    case "active":
      return enrolment.currentGrade !== undefined
        ? `In progress grade so far: ${enrolment.currentGrade}`
        : `In progress not yet graded`
    case "COMPLITED":
      return `Completed with grade ${enrolment.finalGrade} on ${enrolment.copletedAt.toString()}`;
    case "DROPPED":
      return `Dropped on ${enrolment.droppedAt.toString()} for reason: ${enrolment.reason}`;
  }
}