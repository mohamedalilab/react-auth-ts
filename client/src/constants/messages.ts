// src/constants/messages.ts
export const ERROR_MESSAGES = {
  DEFAULT: "An error has occurred",
  NETWORK: "Network error. Please try again",
  UNAUTHORIZED: "You are not authorized",
  NOT_FOUND: "Resource not found",
  FORBIDDEN: "You don’t have permission",
} as const;

export const SUCCESS_MESSAGES = {
  LOGIN: "Logged in successfully",
  SIGNUP: "Account created successfully",
} as const;

export const INPUT_ERROR_MESSAGES = {
  // Common
  REQUIRED: "This field is required",
  // Email
  EMAIL_INVALID: "Please enter a valid email address",
  // Password
  PASSWORD_MIN_LENGTH: "Password must be at least 6 characters",
  PASSWORD_NOT_MATCH: "Passwords do not match",
  // Name
  NAME_MIN_LENGTH: "Name must be at least 2 characters",
};
