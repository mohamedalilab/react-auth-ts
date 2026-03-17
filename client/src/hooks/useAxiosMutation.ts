import { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";
import React from "react";

/**
 * PROPS INTERFACE:
 * We only need the instance here. The URL and Data will be passed 
 * to the 'execute' function when the action actually happens.
 */
interface UseAxiosMutationProps {
  axiosInstance: AxiosInstance;
}

/**
 * RETURN INTERFACE:
 * <T> allows the component to define the expected response shape.
 */
interface UseActionReturn<T> {
  // Promise<T> - errors are surfaced via thrown exceptions, not undefined
  execute: (config: AxiosRequestConfig) => Promise<T>;
  actionLoading: boolean;
  actionError: string | null;
}

function useAxiosMutation<T>({
  axiosInstance,
}: UseAxiosMutationProps): UseActionReturn<T> {
  const [actionLoading, setActionLoading] = React.useState<boolean>(false);
  const [actionError, setActionError] = React.useState<string | null>(null);

  /**
   * EXECUTE FUNCTION:
   * Wrapped in useCallback so it doesn't change on every render.
   * This is the function you call in your event handlers (e.g., onClick).
   */
  const execute = React.useCallback(
    async (config: AxiosRequestConfig) => {
      setActionLoading(true);
      setActionError(null); // Clear previous errors

      try {
        /**
         * MASTER FIX: We pass <T> to .request().
         * This links the Axios response directly to the Generic type T
         * provided when the hook was initialized.
         */
        const res = await axiosInstance.request<T>(config);
        return res.data;
      } catch (error: unknown) {
        const err = error as AxiosError;
        console.log(error)

        // Look for server-side error messages first
        const msg =
          (err.response?.data as { message?: string } | undefined)?.message ||
          err.message ||
          `${config.method?.toUpperCase()} request has failed!`;

        setActionError(msg);

        /**
         * IMPORTANT: We throw the error so the component can stop its logic
         * (like navigating away or showing a success toast) if the API fails.
         */
        throw err;
      } finally {
        setActionLoading(false);
      }
    },
    [axiosInstance]
  );

  return { execute, actionLoading, actionError };
}

export default useAxiosMutation;