import React from "react";
import FormField from "./formField";
import SubmitBtn from "./submitBtn";
import RememberMe from "./rememberMe";
import { LoginCredentials, LoginInputs } from "@/types";
import { useForm } from "react-hook-form";
import { INPUT_ERROR_MESSAGES } from "@/constants/messages";

interface LoginFormProps {
  loginRequest: (formData: LoginCredentials) => void;
  loading: boolean;
}

function LoginForm({
  loginRequest,
  loading,
}: LoginFormProps): React.JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({ mode: "onChange" });
  const onSubmit = (data: LoginInputs) => {
    console.log(data);
    loginRequest(data);
  };

  React.useEffect(() => {
    console.log(errors);
  }, [errors.email, errors.password]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="login-form flex flex-col gap-6"
    >
      <FormField
        htmlFor="email"
        label="Email"
        inputError={errors.email?.message}
      >
        <input
          type="email"
          id="email"
          className="form-input"
          disabled={loading}
          {...register("email", {
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: INPUT_ERROR_MESSAGES.EMAIL_INVALID,
            },
            required: {
              value: true,
              message: INPUT_ERROR_MESSAGES.REQUIRED,
            },
          })}
          placeholder="Enter your email"
        />
      </FormField>
      <FormField
        htmlFor="password"
        label="Password"
        inputError={errors.password?.message}
      >
        <input
          type="password"
          id="password"
          className="form-input"
          {...register("password", { required: INPUT_ERROR_MESSAGES.REQUIRED })}
          disabled={loading}
          placeholder="Enter your password"
        />
      </FormField>
      <RememberMe register={register} />
      <SubmitBtn loading={loading}>
        {loading ? "Logging in..." : "Login"}
      </SubmitBtn>
    </form>
  );
}

export default LoginForm;
