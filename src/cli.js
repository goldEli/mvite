const chalk = require("chalk");
const createServer = require("./createServer")
const [ , ,...args] = process.argv 
const port = args[0] || 4000
createServer().listen(port, () => {
  console.log(chalk.green(`Server start ${port} prot http://localhost:${port}`));
});
