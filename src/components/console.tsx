import { NextRouter, useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

type Command = {
  [keyword: string]:
    | string
    | {
        handler: (args: string[], router: NextRouter) => string | void;
        description: string;
      }
    | { subcommand: Command; description: string };
};
const COMMANDS: Command = {
  goto: {
    handler: (args, router) => {
      router.push(`/${args[0]}`);
    },
    description: "open a page",
  },
  go: "goto",
  g: "goto",
  help: {
    handler: () => "goto",
    description: "get help for all or a specific command",
  },
};

export default function Console() {
  const [shown, setShown] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const [command, setCommand] = useState("");
  const [tooltip, setTooltip] = useState("");
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
        if (typeof next === "undefined") {
          setTooltip("Unknown command");
          return;
        } else if (typeof next === "string") {
          next = c[next];
        } else if ("subcommand" in next) {
          c = next.subcommand;
          break;
        } else {
          const res = next.handler(segments, router);
          if (typeof res === "string") {
            setTooltip(res);
          } else {
            setShown(false);
            setCommand("");
            setTooltip("");
          }
          return;
        }
      }
    }
  }

  return (
    <div id="console" className={!shown ? "hidden" : ""}>
      <span>Console</span>
      <input
        ref={input}
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            handleCommand();
          }
        }}
      />
      <span>{tooltip}</span>
    </div>
  );
}
