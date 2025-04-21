import { useState, useEffect } from "react";

export const useQuery = () => {
  // Use state to store the current params
  const [searchParams, setSearchParams] = useState(
    () => new URLSearchParams(window.location.search),
  );

  // Create a derived params object
  const params = Object.fromEntries(searchParams);

  // Listen for popstate events (browser back/forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      setSearchParams(new URLSearchParams(window.location.search));
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Create a custom event for query parameter changes
  const notifyParamChange = () => {
    window.dispatchEvent(new Event("queryParamsChange"));
  };

  // Listen for custom query parameter change events
  useEffect(() => {
    const handleParamChange = () => {
      setSearchParams(new URLSearchParams(window.location.search));
    };

    window.addEventListener("queryParamsChange", handleParamChange);
    return () =>
      window.removeEventListener("queryParamsChange", handleParamChange);
  }, []);

  return {
    // Expose the params object
    params,

    // Get a single parameter value
    get: (key) => searchParams.get(key),

    // Set a single parameter and update URL
    set: (key, value) => {
      const params = new URLSearchParams(window.location.search);
      params.set(key, value);
      window.history.pushState(
        {},
        "",
        `${window.location.pathname}?${params.toString()}`,
      );
      setSearchParams(params); // Update internal state
      notifyParamChange(); // Notify other components
    },

    // Remove a parameter and update URL
    remove: (key) => {
      const params = new URLSearchParams(window.location.search);
      params.delete(key);
      window.history.pushState(
        {},
        "",
        `${window.location.pathname}?${params.toString()}`,
      );
      setSearchParams(params); // Update internal state
      notifyParamChange(); // Notify other components
    },

    // Clear all parameters and update URL
    clear: () => {
      window.history.pushState({}, "", window.location.pathname);
      setSearchParams(new URLSearchParams()); // Update internal state with empty params
      notifyParamChange(); // Notify other components
    },
  };
};
