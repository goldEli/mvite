import * as chalk from "chalk"
import createServer from "./createServer";
const [, , ...args] = process.argv;
let port: number | undefined = 4000;

(() => {
  for (let i = 0; i < args.length; ++i) {
    const arg = args[i]
    if (arg === "--port") {
      const newPort = parseInt(args[i + 1])
      if (isNaN(newPort)) {
        throw new Error(`${args[i]} is not a number!`);
      }

      port = newPort;
      ++i
      continue
    }
    if (arg === "--help") {
      console.log(
        chalk.blue(`
        --port server start port 
      `)
      );
      throw "";
      
    }
  }
})()

if (port > 0) {
  createServer().listen(port, () => {
    console.log(
      chalk.green(`Server start ${port} prot http://localhost:${port}`)
    );
  });
}
