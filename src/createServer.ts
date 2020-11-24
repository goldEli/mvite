import * as Koa from "koa";
import { serverStatic, moduleRewrite, moduleResolve, babelResolve } from "./plugins";
import { IContext } from "./type";

const createServer = () => {
  const app = new Koa();
  const context: IContext = {
    rootPath: process.cwd(),
    app,
  };
  const plugins = [
    moduleRewrite,
    moduleResolve,
    babelResolve,
    serverStatic
  ];
  plugins.forEach((plugin) => plugin(context));
  return app;
};

export default createServer;
