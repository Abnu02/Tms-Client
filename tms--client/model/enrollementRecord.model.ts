import { Temporal } from "@js-temporal/polyfill";
export interface enrollementRecord {
  readonly studentid:string;
  readonly courseCode:string;
 enrolledAt:Temporal.Instant;
}