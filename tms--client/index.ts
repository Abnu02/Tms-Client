import { Temporal } from "@js-temporal/polyfill";
import { Student, isStudent, parseStudent } from "./model/student.model";
import { Assessment, calculateGrade } from "./model/assessment.model";
import { EnrollmentStatus, describeEnrollment } from "./model/enrollement.model";
import { Course, CourseStatus, describeCourseStatus } from "./model/course.model";
import { ApiResponse, renderResponse } from "./model/api-response.model";

// const student: Student = {
//    id: "STU-001",
//    name: "Hana Tadesse",
//    enrollementDate: Temporal.Now.instant(),

// };
//student.id ="STU-999",
//console.log(student.gpa?.toFixed(2));
// console.log(student.gpa?.toFixed(2) ?? "Not yet graded");
//fuction processStudent(data: any ){
//   console.log('GPA: ${DataTransfer.GPA.TOfIXED(2)}');

// function processStudent(raw: unknown) {
//    if (isStudent(raw)) {
//       const gpaDisplay = raw.gpa?.toFixed(2) ?? "Not yet graded";
//       console.log(`Student ${raw.name} GPA: ${gpaDisplay}`);
//    } else {
//       console.error("Invalid student data received");
//    }
// }

// processStudent({ id: "STU-001", name: "Hana", gpa: 3.7 });
// processStudent(42);

// console.log(parseStudent({ id: "STU-001", name: "Hana" }));

const quiz: Assessment = {
   id: "101",
   kind: "quiz",
   title: "TypeScript Basics",
   correctAnswers: 8,
   totalQuestions: 10,
};
const lab: Assessment = {
   id: "102",
   kind: "lab",
   title: "REST",
   functionalScore: 85,
   codeQualityScore: 90,
}
console.log(`Quiz Grade: ${calculateGrade(quiz)}%`);
console.log(`Lab Grade: ${calculateGrade(lab)}%`);


const pending: EnrollmentStatus = {
   status: "PENDING",
   requestedAT: Temporal.Now.instant(),
   studentid: "STU-001",
   courseid: "CRS-101",
};
console.log(describeEnrollment(pending))

const webDevCourse: CourseStatus = {
   status: "ACTIVE",
   enrolledCount: 25,
   startDate: Temporal.PlainDate.from("2024-09-01"),
};
console.log(describeCourseStatus(webDevCourse));


const studentres: ApiResponse<Student> = {
   status: "success",
   data: {
      id: "STU-001",
      name: "someone",
      enrollementDate: Temporal.Now.instant(),
      gpa: 3.8,
   },
   fetchAT: Temporal.Now.instant(),
};
console.log(
   renderResponse(studentres, (s) => `${s.name} GPA: ${s.gpa ?? "N/A"}`),
)
const courseListRes: ApiResponse<Course[]> = {
   status: "success",
   data: [
      {
         id: "CRS-101",
         title: "Web Development Fundamentals",
         capacity: 30,
         startDate: Temporal.PlainDate.from("2026-09-01"),
      },
   ],
   fetchAT: Temporal.Now.instant(),
};
console.log(
   renderResponse(courseListRes, (courses) =>
      courses.map((c) => c.title).join(", "),
   ),
)
const approvedAt = Temporal.Now.instant();
console.log(`Approved at (UTC): ${approvedAt}`);

const addisTime = approvedAt.toZonedDateTimeISO("Africa/Addis_Ababa");
const londonTime = approvedAt.toZonedDateTimeISO("Europe/London");
console.log(`Addis: ${addisTime.toPlainTime()}`);
console.log(`London: ${londonTime.toPlainTime()}`)

const courseStart = Temporal.PlainDate.from("2026-09-01");
const today = Temporal.Now.plainDateISO();
const daysUntilStart = today.until(courseStart).total({ unit: "days" });
console.log(`${Math.floor(daysUntilStart)} days until course starts`)

const deadline = Temporal.PlainDate.from("2026-12-15");
const remaining = today.until(deadline);
console.log(
   `${remaining.total({ unit: "days" })} days until assignment is due`,
);
