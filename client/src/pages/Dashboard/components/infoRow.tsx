import React from "react";

interface InfoRowProps {
  label: string;
  value: string;
}
function InfoRow({ label, value }: InfoRowProps): React.JSX.Element {
  return (
    <div className="info-row flex-between py-3 row-border-bottom">
      <span className="info-label text-alt-black font-semibold capitalize">{label}</span>
      <span className="info-value text-main-black">{value}</span>
    </div>
  );
}

export default InfoRow;
