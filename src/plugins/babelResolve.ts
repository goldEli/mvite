import * as fs from "fs"
import { PluginFunc } from "./type";
import * as path from "path"
import { babelTransform } from "../utils"
const fsp = fs.promises

const babelResolve: PluginFunc = ({ app, rootPath }) => {
  app.use(async (ctx, next) => {
    const { url } = ctx.request
    console.log("bableResolve", url)
    if (!/\.(js|jsx|tsx|ts)$/.test(url)) {
      return next()
    }
    const source = await fsp.readFile(path.join(rootPath, url), "utf8")
    ctx.type = "js"
    ctx.body = babelTransform(source)
  })

}

export default babelResolve