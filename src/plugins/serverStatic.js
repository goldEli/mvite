const static = require("koa-static");
const serverStatic = ({ app, rootPath }) => {
  app.use(static(rootPath));
};

module.exports = serverStatic;
