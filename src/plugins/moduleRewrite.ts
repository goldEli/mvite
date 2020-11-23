import { PluginFunc } from "./type";
const moduleRewrite: PluginFunc = ({app}) => {
  app.use(async (ctx, next) => {
    await next()
    console.log(ctx.body)
  })

}
export default moduleRewrite

