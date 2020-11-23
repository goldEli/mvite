import * as Koa from "koa";
export interface IContext {
  app: Koa<Koa.DefaultState, Koa.DefaultContext>;
  rootPath: string
}