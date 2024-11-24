import { PAGES } from "@/pages";
import { NextRouter, useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { LSYSTEM_PRESETS } from "./lsystem";
import { toDisplayString } from "@/utils";
import { setBackground } from "@/pages/background";

interface Command {
  handler: (args: string[], router: NextRouter) => string | void;
  description: string;
  syntax: string;
}

function identify(segment: string, options: string[]): string | null {
  const matches = options.filter((o) => o.startsWith(segment));
  return matches.length === 1 ? matches[0] : null;
}

function dashList(list: string[]): string {
  return list.map((e) => `- ${e}`).join("\n");
}

type Commands = {
  [keyword: string]:
    | Command
    | { subcommand: Commands; description: string; syntax: string };
};
const COMMANDS: Commands = {
  goto: {
    handler: (args, router) => {
      const dest = identify(args[0], Object.keys(PAGES));

      if (dest !== null) {
        router.push(`/${PAGES[dest]}`);
      } else {
        return (
          "Unknown destination. Available destinations are:\n" +
          dashList(Object.keys(PAGES))
        );
      }
    },
    syntax: "goto <page>",
    description: `Open a page.\n\nAvailable pages are:\n${dashList(
      Object.keys(PAGES)
    )}`,
  },
  help: {
    handler: (args) => {
      console.log(args);
      if (args.length === 0) {
        const commands = dashList(
          Object.entries(COMMANDS)
            .filter((e) => typeof e[1] === "object")
            .map((e) => `${e[0]}: ${e[1].syntax}`)
        );

        return `Available commands are:\n${commands}\n\nHint: you can type any prefix of a command if it is unique.\nFor example, "h" instead of "help".`;
      } else {
        const c = getCommand(args);
        console.log(c);

        if (c !== null) {
          return `Syntax: ${c[0].syntax}\n${c[0].description}`;
        } else {
          return "Unknown command";
        }
      }
    },
    syntax: "help [cmd]",
    description: "Get help for all or a specific command",
  },
  background: {
    handler: (args, router) => {
      if (args.length === 0) {
        router.push("/background");
      } else {
        const preset = identify(args[0], Object.keys(LSYSTEM_PRESETS));
        if (preset) {
          setBackground(LSYSTEM_PRESETS[preset], router);
        } else {
          return (
            "Unknown preset. Available presets are\n" +
            dashList(Object.keys(LSYSTEM_PRESETS))
          );
        }
      }
    },
    syntax: "background [preset]",
    description: `Change the background to the given preset, or open the background picker.\n\nAvailable presets are:\n${dashList(
      Object.keys(LSYSTEM_PRESETS)
    )}`,
  },
};

function getCommand(
  segments: string[]
): [Command, string[], Commands, string] | null {
  let c = COMMANDS;
  let parent = COMMANDS;
  let name = "";
  while (true) {
    name = segments[0];

    const full_match = identify(name, Object.keys(c));
    if (full_match === null) {
      return null;
    }

    let next = c[full_match];
    segments = segments.slice(1);

    while (true) {
      if (typeof next === "undefined") {
        return null;
      } else if ("subcommand" in next) {
        parent = c;
        c = next.subcommand;
      } else {
        return [next, segments, parent, name];
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
      if (event.ctrlKey && event.key === "k") {
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
