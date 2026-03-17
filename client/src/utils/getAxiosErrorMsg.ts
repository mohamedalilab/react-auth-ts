import { AxiosError } from "axios";
import { ERROR_MESSAGES } from "@/constants/messages";

function getAxiosErrorMsg(err: AxiosError): string {
  // 1. Server sends a message
  const serverMessage = (err.response?.data as { message?: string } | undefined)
    ?.message;
  if (serverMessage) return serverMessage;

  // 2. Map by status code
  const status = err.response?.status;
  switch (status) {
    case 401:
      return ERROR_MESSAGES.UNAUTHORIZED;
    case 403:
      return ERROR_MESSAGES.FORBIDDEN;
    case 404:
      return ERROR_MESSAGES.NOT_FOUND;
    default:
      break;
  }

  // 3. Network error
  if (err.message.includes("Network Error")) return ERROR_MESSAGES.NETWORK;

  // 4. Fallback default
  return ERROR_MESSAGES.DEFAULT;
}

export default getAxiosErrorMsg;
