import * as babel from "@babel/core"

export const babelTransform = (source: string): string => {
  const obj = babel.transform(source, {
    sourceType: "module",
    plugins: [
      "@babel/plugin-transform-react-jsx",
      // "transform-commonjs-es2015-modules"
    ]
  })
  return obj.code
}