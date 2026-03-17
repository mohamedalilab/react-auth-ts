import { ERROR_MESSAGES } from "@/constants/messages";
import React from "react";
interface ErrorMsgProps {
  error?: string | null;
}
function ErrorMsg({ error }: ErrorMsgProps): React.JSX.Element {
  return (
    <div
      className="error-msg bg-errorBg
      text-errorText text-center p-3 mb-4
      border border-[#fcc] rounded
      "
    >
      {error ?? ERROR_MESSAGES.DEFAULT}
    </div>
  );
}

export default ErrorMsg;
