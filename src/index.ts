import * as chalk from "chalk"
import createServer from "./createServer";
const [, , ...args] = process.argv;
let port: number | undefined = 4000;

(() => {
  for (let i = 0; i < args.length; ++i) {
    const arg = args[i]
    if (arg === "--port") {
      port = parseInt(args[i + 1]) || 4000;
      ++i
      continue
    }
    if (arg === "--help") {
      console.log(
        chalk.blue(`
        --port server start port 
      `)
      );
      port = void 0
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
