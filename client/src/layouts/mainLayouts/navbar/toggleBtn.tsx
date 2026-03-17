import React from "react";
import { IoMenu } from "react-icons/io5";

interface ToggleBtnProps {
  handleToggle: () => void;
}

function ToggleBtn({ handleToggle }: ToggleBtnProps): React.JSX.Element {
  return (
    <button type="button" className="toggle-nav-btn" onClick={handleToggle}>
      <IoMenu className="toogle-nav-btn text-2xl md:hidden hover:text-theme" />
    </button>
  );
}

export default ToggleBtn;
