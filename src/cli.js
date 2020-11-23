const chalk = require("chalk");
const createServer = require("./createServer");
const [, , ...args] = process.argv;
let port = 4000;

for (let i = 0; i < args.length; ++i) {
  const arg = args[i]
  if (arg === "--port") {
    port = args[i + 1];
    ++i
    continue
  }
  if (arg === "--help") {
    console.log(
      chalk.blue(`
        --port server start port 
      `)
    );
    return
  }
}

createServer().listen(port, () => {
  console.log(
    chalk.green(`Server start ${port} prot http://localhost:${port}`)
  );
});
