import { useEffect } from "react";
import { UNSAFE_NavigationContext } from "react-router-dom";
import { useContext } from "react";

const useBlocker = (blocker, when = true) => {
  const { navigator } = useContext(UNSAFE_NavigationContext);

  useEffect(() => {
    if (!when) return;

    const push = navigator.push;
    const replace = navigator.replace;

    navigator.push = (...args) => {
      if (blocker()) return;
      push(...args);
    };
    navigator.replace = (...args) => {
      if (blocker()) return;
      replace(...args);
    };

    return () => {
      navigator.push = push;
      navigator.replace = replace;
    };
  }, [navigator, blocker, when]);
}

function usePrompt(message, when = true, cancelSeats) {
  useBlocker(() => {
    const confirmLeave = window.confirm(message);
    if (confirmLeave) {
        cancelSeats?.();
        return false;
    }
    return true;
  }, when);
}

export default usePrompt;
