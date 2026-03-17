import React from "react";

// define pageHeader props type
interface PageHeaderProps {
  heading: string;
  text?: string;
  children?: React.ReactNode;
}
function PageHeader({
  heading,
  text,
  children,
}: PageHeaderProps): React.JSX.Element {
  return (
    <div className="page-header mb-8">
      <h1 className="text-main-black text-4xl mb-2">{heading}</h1>
      {text && <p className="header-text text-alt-black text-lg">{text}</p>}
      {children}
    </div>
  );
}

export default PageHeader;
