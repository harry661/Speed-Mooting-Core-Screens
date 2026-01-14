// Route path constants for SpeedMooting platform

// Base routes
export const ROUTES = {
    HOME: "/",
    LOGIN: "/login",
    SETTINGS: "/settings",

    // Exercise routes
    EXERCISES: "/exercises",
    EXERCISE_DETAIL: (id: number | string) => `/exercises/${id}`,

    // Submission routes
    SUBMISSION_NEW: (exerciseId: number | string) => `/submissions/new?exercise=${exerciseId}`,
    SUBMISSION_HISTORY: "/history",
    RESOURCE_HISTORY: "/history/resources",

    // Report routes
    REPORT: (submissionId: number | string) => `/report?submissionId=${submissionId}`,

    // Tutorial and resource routes
    TUTORIALS: "/tutorials",
    TUTORIALS_TAB: (tab: "tutorials" | "databases" | "subjects") => `/tutorials?tab=${tab}`,
    TUTORIAL_DETAIL: (id: number | string) => `/tutorials/${id}`,

    // Subject guide routes
    SUBJECT_GUIDES: "/tutorials?tab=subjects",
    SUBJECT_GUIDE_DETAIL: (id: number | string) => `/subjects/${id}`,
} as const

// Tab navigation for tutorials page
export const TUTORIAL_TABS = {
    TUTORIALS: "tutorials",
    DATABASES: "databases",
    SUBJECTS: "subjects",
} as const

// Export helper type for tab parameter
export type TutorialTab = typeof TUTORIAL_TABS[keyof typeof TUTORIAL_TABS]
