import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import useAuthStore from "@/store/useAuthStore";
import { refreshAuth } from "./authServices";

const axiosPrivate_BASE_URL = "https://react-auth-ts-server.vercel.app/api";

// axios public for auth requsts [login, register, refresh, logout]
export const axiosPublic = axios.create({
  baseURL: axiosPrivate_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
// Used for authenticated requests which requires [access token]
export const axiosPrivate = axios.create({
  baseURL: axiosPrivate_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Get logout function from Zustand store
const logout = useAuthStore.getState().logout;

// -------------------------------------------
// Request interceptor to handle token refresh
// -------------------------------------------
// This runs before every request
axiosPrivate.interceptors.request.use(
  (config) => {
    // Get latest accessToken from global store
    const accessToken = useAuthStore.getState().accessToken;
    // If Authorization header is not already set, add it
    // Prevents overwriting headers set manually per request
    if (!config.headers["Authorization"] && accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config; // continue request
  },
  // If there was an error setting up the request, reject it
  (error) => Promise.reject(error)
);

// --------------------------------------------
// Response interceptor to handle token refresh
// --------------------------------------------

// Flag to indicate if refreshToken request is in progress
let isRefreshing = false;
// Queue for requests that failed while refresh is in progress
// Each request in array takes resolve & reject functions
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

// Function to process all queued requests after refresh completes
const processQueue = (
  error: AxiosError | null,
  token: string | null = null
) => {
  failedQueue.forEach((prom) => {
    error ? prom.reject(error) : prom.resolve(token);
  });
  failedQueue = []; // clear the qeue
};

// Response interceptor to handle token expiration
axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // get original request with custom flag to prevent infinite retry
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };
    // check if its an auth err with 401 and if we try before
    if (error.response?.status === 401 && !originalRequest._retry) {
      // check if already we are refreshing
      if (isRefreshing) {
        // Return a promise that will resolve when the refresh is done
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            // Attach the new token to the original request
            if (originalRequest.headers && token) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            // Retry the original request
            return axiosPrivate(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      // Mark original request as retried
      originalRequest._retry = true;
      isRefreshing = true; // mark that refresh is in progress

      try {
        // Call refreshAuth (uses axiosPublic) to get a new access token
        const newAccessToken = await refreshAuth();

        // Process all queued requests waiting for the new token
        processQueue(null, newAccessToken);

        // Attach the new token to the original request
        if (originalRequest.headers && newAccessToken) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        // Retry the original request
        return axiosPrivate(originalRequest);
      } catch (refreshError) {
        // If refresh failed, reject all queued requests
        processQueue(refreshError as AxiosError, null);

        logout(); // Logout the user

        // Reject the original request
        return Promise.reject(refreshError);
      } finally {
        // Reset refreshing flag
        isRefreshing = false;
      }
    }

    // If error is not 401 or retry already happened, reject as-is
    return Promise.reject(error);
  }
);
