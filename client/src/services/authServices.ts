import { axiosPublic } from "./api";
import useAuthStore from "../store/useAuthStore";
import { AuthResponse } from "@/types";

export const refreshAuth = async () => {
  const response = await axiosPublic.get<AuthResponse>("/auth/refresh");
  const { accessToken, user } = response.data;

  // update store directly
  useAuthStore.getState().setAuth({ accessToken, user });

  return accessToken;
};
