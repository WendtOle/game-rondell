import React from "react";
import { Button } from "./components/Button";
import { useRecoilState, useRecoilValue } from "recoil";
import { isValidSessionState, sessionState } from "./state/sessions";

export const FinishSessionButton = () => {
  const [session, setSession] = useRecoilState(sessionState);
  const isValidSession = useRecoilValue(isValidSessionState);
  const displayResults = session?.finished;

  const { isValid } = isValidSession;

  if (displayResults) {
    return null;
  }

  return (
    <div className="w-full flex justify-center">
      <Button
        disabled={!isValid}
        title="Abstimmung beenden"
        onClick={() =>
          setSession((cur) =>
            cur === undefined ? cur : { ...cur, finished: true },
          )
        }
      />
    </div>
  );
};
