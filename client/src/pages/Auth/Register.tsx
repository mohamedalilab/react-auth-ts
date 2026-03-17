import { useNavigate, Link } from "react-router-dom";
import useAxiosMutation from "../../hooks/useAxiosMutation";
import { AuthResponse, RegisterData } from "../../types";
import RegisterForm from "./components/registerForm";
import FormWrapper from "./components/formWrapper";
import React from "react";
import { registerSchema } from "@/utils/registerSchema";
import { validate } from "@/utils/validate";
import useAuthStore, { selectSetAuth } from "@/store/useAuthStore";
import { axiosPublic } from "@/services/api";

function Register(): React.JSX.Element {
  const navigate = useNavigate();
  const setAuth = useAuthStore(selectSetAuth);
  const {
    execute: executeRegister,
    actionLoading: loading,
    actionError: error,
  } = useAxiosMutation<AuthResponse>({
    axiosInstance: axiosPublic,
  });

  const [inputsErr, setInputsErr] = React.useState<Record<string, string>>({});

  const handleSubmit = async (formData: RegisterData) => {
    const { presist, confirmPassword, ...userData } = formData;
    const { isValid, errors } = validate(
      { ...userData, confirmPassword },
      registerSchema
    );
    if (!isValid) return setInputsErr(errors);
    setInputsErr({});
    const response = await executeRegister({
      method: "POST",
      url: "/auth/register",
      data: userData,
    });
    if (response) {
      const { accessToken, user } = response;
      setAuth({ user, accessToken });
      localStorage.setItem("react-auth-presist", JSON.stringify(presist));
      navigate("/dashboard");
    }
  };

  return (
    <FormWrapper formTitle="register" error={error}>
      <RegisterForm
        onSubmit={handleSubmit}
        loading={loading}
        inputsErr={inputsErr}
      />
      <p className="auth-footer text-gray-500 text-center mt-6">
        Already have an account?
        <Link to="/login" className="text-theme font-bold ml-1 hover:underline">
          Login here
        </Link>
      </p>
    </FormWrapper>
  );
}

export default Register;
