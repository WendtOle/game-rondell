import React from "react";
import { Button } from "./components/Button";
import { useRecoilState, useRecoilValue } from "recoil";
import { isValidSessionState, sessionState } from "./state/sessions";

export const FinishSessionButton = () => {
  const [session, setSession] = useRecoilState(sessionState);
  const isValidSession = useRecoilValue(isValidSessionState);
  const displayResults = session?.finished;

  const { isValid, errorMessage } = isValidSession;

  return (
    <div className="mb-4">
      {errorMessage && (
        <h2 className="text-2xl text-red-400">{errorMessage}</h2>
      )}
      {!displayResults && (
        <Button
          disabled={!isValid}
          title="Session beenden und Ergebnisse anzeigen"
          onClick={() =>
            setSession((cur) =>
              cur === undefined ? cur : { ...cur, finished: true },
            )
          }
        />
      )}
    </div>
  );
};
