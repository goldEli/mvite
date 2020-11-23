import * as koaStatic from "koa-static"
import { PluginFunc } from "./type";

const serverStatic: PluginFunc = ({ app, rootPath }) => {
  app.use(koaStatic(rootPath));
};

export default serverStatic;
