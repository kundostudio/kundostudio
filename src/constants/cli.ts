type CLIAnimation = {
  duration: number;
  delay?: number;
};

type CLITextAnimation = CLIAnimation & {
  type: "text";
  text: string;
};

type CLICursorAnimation = CLIAnimation & {
  type: "cursor";
  iterations: number;
};

export const CLI_TIMELINE: (CLITextAnimation | CLICursorAnimation)[] = [
  {
    type: "text",
    text: "jennym@Jennys-MBP",
    duration: 0,
  },
  {
    type: "text",
    text: " test project",
    duration: 0,
    delay: 0.2,
  },
  {
    type: "text",
    text: " %",
    duration: 0,
    delay: 0.2,
  },
  {
    type: "cursor",
    duration: 2,
    iterations: 3,
  },
  {
    type: "text",
    text: " flox activate",
    duration: 1.5,
  },
  {
    type: "text",
    text: "<br />Building environment `test-project`",
    duration: 0,
    delay: 0.5,
  },
  {
    type: "text",
    text: ".",
    duration: 0.2,
  },
  {
    type: "text",
    text: ".",
    duration: 0.2,
  },
  {
    type: "text",
    text: ".",
    duration: 0.2,
  },
  {
    type: "text",
    text: "<br /><br />Getting ready to use environment project at /path/to/env/test-project",
    duration: 0,
    delay: 0.5,
  },
  {
    type: "text",
    text: "<br />✅ You are now using the environment 'test-project' at /path/to/env/test-project To stop using this environment, type 'exit'",
    duration: 0,
    delay: 1,
  },
];
