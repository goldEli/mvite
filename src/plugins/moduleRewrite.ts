import { ReadStream } from "fs";
import { PluginFunc } from "./type";
import { init, parse } from 'es-module-lexer';
import MagicString from "magic-string"

const fileTypes = ["js", "jsx", "ts", "tsx"]

function streamToString(stream: ReadStream): Promise<string> {
  const chunks = []
  return new Promise((resolve, reject) => {
    stream.on('data', chunk => chunks.push(chunk))
    stream.on('error', reject)
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
  })
}

function isRelativePath(str: string): boolean {
  return ["./", "../"].some(item => str.startsWith(item))
}

async function rewriteImport(source: string): Promise<string> {
  await init;
  const [imports] = parse(source, 'optional-sourcename');
  const magicString = new MagicString(source)
  for (let item of imports) {
    let urlStr = source.substring(item.s, item.e)
    if (!isRelativePath(urlStr)) {
      magicString.overwrite(item.s, item.e, `/@module/${urlStr}`)
    }
  }
  return Promise.resolve(magicString.toString())
}

const moduleRewrite: PluginFunc = ({ app }) => {
  app.use(async (ctx, next) => {
    await next()

    if (ctx.body instanceof ReadStream && ctx.response.is("js")) {
      const content = await streamToString(ctx.body)
      const res = await rewriteImport(content)
      // console.log(ctx.body)
      ctx.body = res
      return
    }
    if (typeof ctx.body === "string" && ctx.response.is("js")) {
      const res = await rewriteImport(ctx.body)
      // console.log(ctx.body)
      ctx.body = res
      return
    }
  })

}
export default moduleRewrite

