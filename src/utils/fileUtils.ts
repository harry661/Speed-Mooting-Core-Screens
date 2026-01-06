/**
 * Formats a file size in bytes to a human-readable string
 * @param bytes - The file size in bytes
 * @returns A formatted string (e.g., "1.5 MB")
 */
export const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i]
}

/**
 * Gets the file type from a File object
 * @param file - The file object
 * @returns The file type as a string
 */
export const getFileType = (file: File): string => {
    return file.type || file.name.split('.').pop()?.toUpperCase() || "Unknown"
}

/**
 * Validates if a file is a valid video type
 * @param file - The file to validate
 * @returns True if valid, false otherwise
 */
export const isValidVideoFile = (file: File): boolean => {
    const validTypes = ["video/mp4", "video/mov", "video/webm"]
    return validTypes.includes(file.type)
}

/**
 * Validates if a file is a valid document type
 * @param file - The file to validate
 * @returns True if valid, false otherwise
 */
export const isValidDocumentFile = (file: File): boolean => {
    const validTypes = [".doc", ".docx", ".pdf"]
    const ext = file.name.toLowerCase().split('.').pop()
    return ext ? validTypes.includes(`.${ext}`) : false
}

/**
 * Validates file size against a maximum
 * @param file - The file to validate
 * @param maxSizeBytes - Maximum size in bytes
 * @returns True if valid, false otherwise
 */
export const isValidFileSize = (file: File, maxSizeBytes: number): boolean => {
    return file.size <= maxSizeBytes
}

