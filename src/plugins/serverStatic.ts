import * as koaStatic from "koa-static"
import { IContext } from "../type";

const serverStatic = ({ app, rootPath }: IContext) => {
  app.use(koaStatic(rootPath));
};

export default serverStatic;
