import { useState, useEffect } from "react";

export const useSessionId = (): {
  sessionId: string | undefined;
  set: (key: string, value: string) => void;
} => {
  // Use state to store the current params
  const [searchParams, setSearchParams] = useState(
    () => new URLSearchParams(window.location.search),
  );

  // Create a derived params object
  const params = Object.fromEntries(searchParams);
  const sessionId = params["session"] ?? undefined;

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
    sessionId,
    set: (key, value) => {
      const params = new URLSearchParams(window.location.search);
      params.set(key, value);
      window.history.pushState(
        {},
        "",
        `${window.location.pathname}?${params.toString()}`,
      );
      setSearchParams(params);
      notifyParamChange();
    },
  };
};
