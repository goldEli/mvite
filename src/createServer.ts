import * as Koa from "koa";
import { serverStatic } from "./plugins";
import { IContext } from "./type";

const createServer = () => {
  const app = new Koa();
  const context: IContext = {
    rootPath: process.cwd(),
    app,
  };
  const plugins = [serverStatic];
  plugins.forEach((plugin) => plugin(context));
  return app;
};

export default createServer;
