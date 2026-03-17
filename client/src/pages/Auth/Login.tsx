import React from "react";
import { useNavigate, Link } from "react-router-dom";
import useAxiosMutation from "../../hooks/useAxiosMutation";
import { AuthResponse, LoginCredentials } from "../../types";
import LoginForm from "./components/loginForm";
import FormWrapper from "./components/formWrapper";
import useAuthStore, { selectSetAuth } from "@/store/useAuthStore";
import { axiosPublic } from "@/services/api";

function Login(): React.JSX.Element {
  const navigate = useNavigate();
  const setAuth = useAuthStore(selectSetAuth);

  const {
    execute: executeLogin,
    actionLoading: loading,
    actionError: error,
  } = useAxiosMutation<AuthResponse>({
    axiosInstance: axiosPublic,
  });

  const loginRequest = async (formData: LoginCredentials) => {
    const { presist, ...userData } = formData;
    const response = await executeLogin({
      method: "POST",
      url: "/auth/login",
      data: userData,
    });

    if (response) {
      const { accessToken, user } = response;
      setAuth({ accessToken, user });
      localStorage.setItem("react-auth-presist", JSON.stringify(presist));
      navigate("/dashboard");
    }
  };

  return (
    <FormWrapper formTitle="Login" error={error}>
      <LoginForm
        loginRequest={loginRequest}
        loading={loading}
      />
      <p className="auth-footer text-gray-500 text-center mt-6">
        Don't have an account?
        <Link
          to="/register"
          className="text-theme font-bold ml-1 hover:underline"
        >
          Register here
        </Link>
      </p>
    </FormWrapper>
  );
}

export default Login;
