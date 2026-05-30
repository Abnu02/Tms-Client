export interface Quiz {
    readonly id: string;
    kind: "quiz";
    title: string;
    correctAnswers: number;
    totalQuestions: number;
}
export interface LabAssignment {
    readonly id: string;
    kind: "lab";
    title: string;
    functionalScore: number;
    codeQualityScore: number;
}
export type Assessment = Quiz | LabAssignment;

export function calculateGrade(item: Assessment): number {
    switch (item.kind) {
        case "quiz":
            return Math.round((item.correctAnswers / item.totalQuestions) * 100);
        case "lab":
            return Math.round(item.functionalScore * 0.7 + item.codeQualityScore * 0.3);
    }
}