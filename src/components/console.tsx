import { NextRouter, useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

type Command = {
  [keyword: string]: string | ((router: NextRouter) => string | void) | Command;
};
const COMMANDS: Command = {
  goto: {
    home: (r) => {
      r.push("/");
    },
    skills: (r) => {
      r.push("/skills");
    },
  },
  go: "goto",
  g: "goto",
};

export default function Console() {
  const [shown, setShown] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const [command, setCommand] = useState("");
  const router = useRouter();

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
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  });

  useEffect(() => {
    if (shown && input.current) {
      input.current.focus();
    }
  }, [shown, input]);

  function handleCommand() {
    let segments = command.split(/\s+/);
    console.log(segments);

    let c = COMMANDS;
    while (true) {
      let next = c[segments[0]];
      segments = segments.slice(1);

      while (true) {
        if (typeof next === "string") {
          next = c[next];
        } else if (typeof next === "object") {
          c = next;
          break;
        } else {
          next(router);
          return;
        }
      }
    }
  }

  return (
    <div id="console" className={!shown ? "hidden" : ""}>
      <span>Console</span>
      <br />
      <input
        ref={input}
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            handleCommand();
            setShown(false);
            setCommand("");
          }
        }}
      />
    </div>
  );
}
