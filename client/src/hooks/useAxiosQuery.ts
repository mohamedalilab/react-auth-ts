import React from "react";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";

/**
 * MASTER INTERFACE: Defines the shape of the hook's return value.
 * Using <T> (Generics) allows the component to define exactly 
 * what kind of data to expect (e.g., User[], Task, etc.).
 */
interface UseAxiosReturn<T> {
  data: T | null;
  isLoading: boolean; // Lowercase 'boolean' is the correct TS primitive
  error: string | null;
  refetch: () => void;
}

interface UseAxiosQueryProps {
  axiosInstance: AxiosInstance;
  url: string;
  config?: AxiosRequestConfig;
}

function useAxiosQuery<T>({
  axiosInstance,
  url,
  config,
}: UseAxiosQueryProps): UseAxiosReturn<T> {
  // 1. STATE INITIALIZATION
  const [data, setData] = React.useState<T | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [reload, setReload] = React.useState<boolean>(false);

  /**
   * REFETCH LOGIC:
   * We use a boolean toggle to trigger the useEffect. 
   * useCallback ensures this function's reference stays the same, 
   * preventing child components from re-rendering unnecessarily.
   */
  const refetch = React.useCallback(() => setReload((prev) => !prev), []);

  // 2. THE SIDE EFFECT (The Heart of the Hook)
  React.useEffect(() => {
    // Standard Web API to cancel the request if component unmounts
    const controller = new AbortController();

    /**
     * Why define fetchData INSIDE useEffect?
     * - It avoids the "Infinite Loop" caused by the 'config' object reference.
     * - It doesn't need to be in the dependency array.
     * - It has direct access to the latest 'url' and 'config' values.
     */
    const fetchData = async () => {
      setIsLoading(true);
      setError(null); // Reset error state before a new attempt

      try {
        const res = await axiosInstance.get<T>(url, {
          ...config,
          signal: controller.signal, // Link the request to our AbortController
        });
        setData(res.data);
      } catch (error: unknown) {
        const err = error as AxiosError;

        // Don't update state if the request was intentionally cancelled
        if (axios.isCancel(err) || err.code === "ERR_CANCELED") {
          return;
        }

        // Master Tip: Prioritize server-side error messages (e.g., "Email already exists")
        const message =
          (err.response?.data as { message?: string } | undefined)?.message ||
          err.message ||
          "An error occurred";

        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    /**
     * CLEANUP FUNCTION:
     * If the user leaves the page or the URL changes while the request is 
     * in-flight, this cancels it to prevent memory leaks and "ghost" updates.
     */
    return () => controller.abort();

    /**
     * DEPENDENCIES:
     * We trigger a new fetch ONLY if the URL changes or the user clicks 'refetch'.
     * We EXCLUDE 'config' here because objects create a new reference every render,
     * which would cause an infinite loop of network requests.
     */
  }, [url, reload, axiosInstance]);

  return { data, error, isLoading, refetch };
}

export default useAxiosQuery;