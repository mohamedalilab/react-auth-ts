import { INPUT_ERROR_MESSAGES } from "@/constants/messages";
import { required, minLength, emailFormat } from "./validators";

export const loginSchema = {
  email: [
    required(INPUT_ERROR_MESSAGES.REQUIRED),
    emailFormat(INPUT_ERROR_MESSAGES.EMAIL_INVALID),
  ],
  password: [required(INPUT_ERROR_MESSAGES.REQUIRED), minLength(6)],
};
