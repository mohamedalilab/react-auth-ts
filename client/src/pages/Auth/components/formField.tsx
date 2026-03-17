import clsx from "clsx";
import React from "react";

interface FormFieldProps {
  htmlFor: string;
  label: string;
  children: React.ReactNode;
  inputError?: string | null;
}
function FormField({
  htmlFor,
  label,
  inputError,
  children,
}: FormFieldProps): React.JSX.Element {
  console.log(label)
  return (
    <div className={clsx("form-field", inputError && "field-error")}>
      <label htmlFor={htmlFor} className="form-label">
        {label}
      </label>
      {children}
      {inputError && <p className="form-input-msg">{inputError}</p>}
    </div>
  );
}

export default FormField;
