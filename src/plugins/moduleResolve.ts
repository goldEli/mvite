import { PluginFunc } from "./type";
import * as path from "path";
import * as fs from "fs"
import { babelTransform } from "../utils";
const fsp = fs.promises

const moduleREG = /^\/@module\//
const reactFilesMap = {
  "/@module/react": '/@pika/react/source.development.js',
  "/@module/react-dom": '/@pika/react-dom/source.development.js'
}

const moduleResolve: PluginFunc = ({ app, rootPath }) => {
  app.use(async (ctx, next) => {
    const { url } = ctx.request
    console.log("moduleResolve", url)
    if (!moduleREG.test(url)) {
      return next()
    }
    // 特殊处理 react
    if (Object.keys(reactFilesMap).includes(url)) {
      const modulePath = path.join(rootPath, "node_modules")
      const entryFilePath = path.join(modulePath, reactFilesMap[url])
      const content = await fsp.readFile(entryFilePath, "utf8")
      ctx.type = "js"
      ctx.body = babelTransform(content)
      return
    }
    const modulePath = path.join(rootPath, "node_modules", url.replace(moduleREG, ""))
    const packageJsonPath = path.join(modulePath, "package.json")
    const packageJson = await fsp.readFile(packageJsonPath, "utf8")
    const entryFileName = JSON.parse(packageJson)['main']
    const entryFilePath = path.join(modulePath, entryFileName)
    const content = await fsp.readFile(entryFilePath, "utf8")
    ctx.type = "js"
    ctx.body = babelTransform(content)

  })
}

export default moduleResolve