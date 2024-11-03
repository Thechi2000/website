import { useEffect, useRef, useState } from "react";

export default function Console() {
  const [shown, setShown] = useState(false);
  const input = useRef<HTMLInputElement>(null);

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
  });

  useEffect(() => {
    if (shown && input.current) {
      input.current.focus();
    }
  }, [shown, input]);

  return (
    <div id="console" className={!shown ? "hidden" : ""}>
      <span>Console</span>
      <br />
      <input ref={input} />
    </div>
  );
}
