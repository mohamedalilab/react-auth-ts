import React from "react";
import ErrorMsg from "./errorMsg";

interface FormWrapperProps {
  children: React.ReactNode;
  formTitle: string;
  error: string | null;
}
function FormWrapper({
  children,
  formTitle,
  error,
}: FormWrapperProps): React.JSX.Element {
  return (
    <div className="container flex-center">
      <div className="card max-w-100 w-full">
        <h1 className="text-main-black text-2xl font-bold text-center mb-8">
          {formTitle}
        </h1>
        {error && <ErrorMsg error={error} />}
        {children}
      </div>
    </div>
  );
}

export default FormWrapper;
