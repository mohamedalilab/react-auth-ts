import React from "react";
import FormField from "./formField";
import SubmitBtn from "./submitBtn";
import RememberMe from "./rememberMe"; // Matches your Login way
import { RegisterData } from "@/types";
import { useForm } from "react-hook-form";
import { INPUT_ERROR_MESSAGES } from "@/constants/messages";

interface RegisterFormProps {
  onSubmit: (formData: RegisterData) => void;
  loading: boolean;
  inputsErr?: Record<string, string>;
}

function RegisterForm({
  onSubmit: registerRequest, // Renamed to avoid confusion with RHF register
  loading,
  inputsErr,
}: RegisterFormProps): React.JSX.Element {
  // 1. Initialize useForm exactly like your Login form
  const {
    register,
    handleSubmit,
    watch, // Added to compare passwords
    formState: { errors },
  } = useForm<RegisterData>({ mode: "onChange" });

  // 2. The internal onSubmit wrapper you used in Login
  const onSubmit = (data: RegisterData) => {
    console.log(data);
    registerRequest(data);
  };

  // Watch password value for the confirmation validation
  const password = watch("password");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="register-form flex flex-col gap-6"
    >
      <FormField
        htmlFor="name"
        label="Name"
        inputError={errors.name?.message || inputsErr?.name}
      >
        <input
          type="text"
          id="name"
          className="form-input"
          disabled={loading}
          {...register("name", { required: INPUT_ERROR_MESSAGES.REQUIRED })}
          placeholder="Enter your name"
        />
      </FormField>

      <FormField
        htmlFor="email"
        label="Email"
        inputError={errors.email?.message || inputsErr?.email}
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
            required: INPUT_ERROR_MESSAGES.REQUIRED,
          })}
          placeholder="Enter your email"
        />
      </FormField>

      <FormField
        htmlFor="password"
        label="Password"
        inputError={errors.password?.message || inputsErr?.password}
      >
        <input
          type="password"
          id="password"
          className="form-input"
          disabled={loading}
          {...register("password", { required: INPUT_ERROR_MESSAGES.REQUIRED })}
          placeholder="Enter your password"
        />
      </FormField>

      <FormField
        htmlFor="confirmPassword"
        label="confirm password"
        inputError={
          errors.confirmPassword?.message || inputsErr?.confirmPassword
        }
      >
        <input
          type="password"
          id="confirmPassword"
          className="form-input"
          disabled={loading}
          {...register("confirmPassword", {
            required: INPUT_ERROR_MESSAGES.REQUIRED,
            validate: (value) => value === password || "Passwords do not match",
          })}
          placeholder="Confirm your password"
        />
      </FormField>

      {/* 3. Passing register to RememberMe, just like your Login way */}
      <RememberMe register={register} />

      <SubmitBtn loading={loading}>
        {loading ? "Registering..." : "Register"}
      </SubmitBtn>
    </form>
  );
}

export default RegisterForm;
