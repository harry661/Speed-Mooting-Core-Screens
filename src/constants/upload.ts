// File upload constants for SpeedMooting platform

// File size limits (in bytes)
export const UPLOAD_LIMITS = {
    MAX_VIDEO_SIZE: 500 * 1024 * 1024, // 500MB
    MAX_DOCUMENT_SIZE: 10 * 1024 * 1024, // 10MB (not currently enforced but good to have)
} as const

// Valid file types for video uploads
export const VALID_VIDEO_TYPES = ["video/mp4", "video/mov", "video/webm"] as const

// Valid file extensions for document uploads
export const VALID_DOCUMENT_EXTENSIONS = [".doc", ".docx", ".pdf"] as const

// HTML accept attributes for file inputs
export const FILE_INPUT_ACCEPT = {
    VIDEO: "video/mp4,video/mov,video/webm",
    DOCUMENT: ".doc,.docx,.pdf",
} as const

// User-friendly error messages
export const UPLOAD_ERROR_MESSAGES = {
    VIDEO_TOO_LARGE: "Video file size must be less than 500MB",
    VIDEO_INVALID_TYPE: "Please upload MP4, MOV, or WEBM video files only",
    DOCUMENT_INVALID_TYPE: "Please upload Word (.doc, .docx) or PDF files only",
    DOCUMENT_TOO_LARGE: "Document file size must be less than 10MB",
} as const

// User-friendly display text for file types
export const FILE_TYPE_DISPLAY = {
    VIDEO: "MP4, MOV or WEBM • Max 500MB",
    SKELETON: "Word (.doc, .docx) or PDF • Optional",
    CASE_FILES: "PDF, Word (.doc, .docx) • Optional",
} as const
