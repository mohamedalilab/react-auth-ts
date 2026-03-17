import { INPUT_ERROR_MESSAGES } from "@/constants/messages";
import { required, minLength, emailFormat, matchField } from "./validators";

export const registerSchema = {
  name: [required(INPUT_ERROR_MESSAGES.NAME_MIN_LENGTH)],
  email: [
    required(INPUT_ERROR_MESSAGES.REQUIRED),
    emailFormat(INPUT_ERROR_MESSAGES.EMAIL_INVALID),
  ],
  password: [required(INPUT_ERROR_MESSAGES.REQUIRED), minLength(6)],
  confirmPassword: [
    required(INPUT_ERROR_MESSAGES.REQUIRED),
    matchField("password", INPUT_ERROR_MESSAGES.PASSWORD_NOT_MATCH),
  ],
};
