const app = require("./server/app");

const port = process.env.PORT || 3000;
const server = app.listen(port);

module.exports = server;
