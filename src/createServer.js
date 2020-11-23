const Koa = require("koa");
const { serverStatic } = require("./plugins");

const createServer = () => {
  const app = new Koa();
  const context = {
    rootPath: process.cwd(),
    app,
  };
  const plugins = [serverStatic];
  plugins.forEach((plugin) => plugin(context));
  return app;
};

module.exports = createServer;
