import { NextRouter, useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

interface Command {
  handler: (args: string[], router: NextRouter) => string | void;
  description: string;
}

type Commands = {
  [keyword: string]:
    | string
    | Command
    | { subcommand: Commands; description: string };
};
const COMMANDS: Commands = {
  goto: {
    handler: (args, router) => {
      router.push(`/${args[0]}`);
    },
    description: "open a page",
  },
  go: "goto",
  g: "goto",
  help: {
    handler: (args) => {
      console.log(args);
      if (args.length === 0) {
        return "available commands are:\n- help\n- goto";
      } else {
        const c = getCommand(args);
        console.log(c);
        if (c !== null) {
          return c[0].description;
        } else {
          return "Unknown command";
        }
      }
    },
    description: "get help for all or a specific command",
  },
};

function getCommand(segments: string[]): [Command, string[]] | null {
  let c = COMMANDS;
  while (true) {
    let next = c[segments[0]];
    segments = segments.slice(1);

    while (true) {
      if (typeof next === "undefined") {
        return null;
      } else if (typeof next === "string") {
        next = c[next];
      } else if ("subcommand" in next) {
        c = next.subcommand;
      } else {
        return [next, segments];
      }
    }
  }
}

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
    const segments = command.split(/\s+/);
    const cmd = getCommand(segments);

    if (cmd) {
      const res = cmd[0].handler(cmd[1], router);
      if (typeof res === "string") {
        setTooltip(res);
      } else {
        setShown(false);
        setCommand("");
        setTooltip("");
      }
    } else {
      setTooltip("Unknown command");
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
      <pre>{tooltip}</pre>
    </div>
  );
}
