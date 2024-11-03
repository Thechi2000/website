import { useEffect, useState } from "react";

export default function Console() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key === ":" || (event.ctrlKey && event.key === "k")) {
        setShown(true);
        event.preventDefault();
      }

      if (event.key === "Escape") {
        setShown(false);
        event.preventDefault();
      }
    };
    window.addEventListener("keyup", listener);

    return () => {
      window.removeEventListener("keyup", listener);
    };
  }, []);

  return (
    <div id="console" className={!shown ? "hidden" : ""}>
      Console
    </div>
  );
}
