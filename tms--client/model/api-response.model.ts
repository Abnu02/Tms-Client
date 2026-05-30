import { Temporal } from "@js-temporal/polyfill";

export type ApiResponse<T> = | {
    status: "loading"
} | {
    status: "success";
    data: T;
    fetchAT: Temporal.Instant;
}
    | {
        status: "error";
        error: string;
        errorCode?: number;

    }

export function renderResponse<T>(
    response: ApiResponse<T>,
    formatter?: (data: T) => string
): string {
    switch (response.status) {
        case "loading":
            return "Loading data, please wait...";
        case "success":

            return formatter ? formatter(response.data) : "Data loaded successfully.";

        case "error":
            return `Error loading data: ${response.error}${response.errorCode ? ` (code ${response.errorCode})` : ""}`;
    }
}