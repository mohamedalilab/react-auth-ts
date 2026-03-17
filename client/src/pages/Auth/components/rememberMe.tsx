import { LoginInputs } from "@/types";
import React from "react";
import { UseFormRegister } from "react-hook-form";

interface RememberMeProps {
  register: UseFormRegister<LoginInputs>;
}
function RememberMe({ register }: RememberMeProps): React.JSX.Element {
  return (
    <div className="checkbox-container flex items-center gap-2">
      <input
        type="checkbox"
        className="w-4 h-4"
        id="presist"
        {...register("presist")}
      />

      <label htmlFor="presist" className="capitalize">
        remember me
      </label>
    </div>
  );
}

export default RememberMe;
