require("dotenv").config();
const connect = require("connect");
const serveStatic = require("serve-static");
const PORT = process.env.PORT;

connect()
  .use(serveStatic(__dirname))
  .listen(PORT, () => console.log(`Server started on port ${PORT}`));
