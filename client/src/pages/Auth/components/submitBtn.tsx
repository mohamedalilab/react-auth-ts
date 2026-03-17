import React from "react";

interface SubmitBtnProps {
  loading: boolean;
  children: React.ReactNode;
}
function SubmitBtn({ loading, children }: SubmitBtnProps): React.JSX.Element {
  return (
    <button type="submit" className="btn btn-primary mt-2" disabled={loading}>
      {children}
    </button>
  );
}

export default SubmitBtn;
