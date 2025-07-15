import readline from "readline";

export function waitForEnter(msg: string): Promise<void> {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(`\n${msg}\nPress Enter to continue...`, () => {
      rl.close();
      resolve();
    });
  });
}