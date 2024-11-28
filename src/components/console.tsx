import { PAGES } from "@/pages";
import { NextRouter, useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { LSYSTEM_PRESETS } from "./lsystem";
import style from "@/styles/Console.module.scss";
import { setBackground } from "@/pages/background";
import { symbolName } from "typescript";
import { Data } from "@/models";
import { stat } from "node:fs";

interface Command {
  handler: (args: string[], router: NextRouter, data: Data) => string | void;
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
  cd: {
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
    syntax: "cd <page>",
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

        return `Available commands are:\n${commands}\n\nHint: you can type any prefix of a command if it is\nunique. For example, "h" instead of "help".`;
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
            "Unknown preset. Available presets are:\n" +
            dashList(Object.keys(LSYSTEM_PRESETS))
          );
        }
      }
    },
    syntax: "background [preset]",
    description: `Change the background to the given preset, or open the\nbackground picker.\n\nAvailable presets are:\n${dashList(
      Object.keys(LSYSTEM_PRESETS)
    )}`,
  },
  clear: {
    handler: () => {
      return "";
    },
    syntax: "clear",
    description: "Clear the console",
  },
  contact: {
    handler: (args, router, data) => {
      console.log(data);
      const network = identify(args[0], Object.keys(data.socials));
      console.log(network);

      if (network !== null) {
        const url = data.socials[network].url;
        window.open(url, "_blank");
      } else {
        return (
          "Unknown network. Available networks are:\n" +
          dashList(Object.keys(data.socials))
        );
      }
    },
    syntax: "contact <network>",
    description: "Open a contact link",
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

export default function Console(props: { data: Data }) {
  const [shown, setShown] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const [command, setCommand] = useState("");
  const [tooltip, setTooltip] = useState("");

  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  useEffect(() => {
    const cachedHistory = localStorage.getItem("history");

    if (cachedHistory) {
      setHistory(JSON.parse(cachedHistory));
    }
  }, []);

  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem("history", JSON.stringify(history));
    }
  }, [history]);

  const router = useRouter();

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "k") {
        setHistoryIndex(-1);
        setCommand("");
        setShown((state) => !state);
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
      const res = cmd[0].handler(cmd[1], router, props.data);
      if (typeof res === "string") {
        setTooltip(res);
      } else {
        setTooltip("");
        setShown(false);
      }

      setHistoryIndex(-1);
      setHistory([command, ...history]);
      setCommand("");
    } else {
      setTooltip("Unknown command");
    }
  }

  function generateBackground() {
    const full = "+----------------------------------------------------------+";
    const empty =
      "|                                                          |";
    const height = 3 + (tooltip ? 1 + tooltip.split("\n").length : 0);

    return [full, ...Array(height).fill(empty), full].join("\n");
  }

  return (
    <div className={style.console}>
      <pre
        style={{ position: "fixed" }}
        className={`${style.background} ${!shown ? style.hidden : ""}`}
      >
        {generateBackground()}
      </pre>
      <pre className={`${style.content} ${!shown ? style.hidden : ""}`}>
        <br />
        <br />${" "}
        <input
          ref={input}
          value={command}
          placeholder="Type a command..."
          onChange={(e) => setCommand(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleCommand();
            }

            console.log(historyIndex);

            if (e.key === "ArrowUp") {
              if (historyIndex < history.length - 1) {
                console.log(history[historyIndex]);
                setCommand(history[historyIndex + 1]);
                setHistoryIndex(historyIndex + 1);
              }
            }

            if (e.key === "ArrowDown") {
              if (historyIndex > 0) {
                setCommand(history[historyIndex - 1]);
                setHistoryIndex(historyIndex - 1);
              } else if (historyIndex === 0) {
                setCommand("");
                setHistoryIndex(-1);
              }
            }
          }}
        />
        {tooltip ? (
          <>
            <br />
            <br />
            {tooltip}
          </>
        ) : (
          <></>
        )}
      </pre>
    </div>
  );
}
