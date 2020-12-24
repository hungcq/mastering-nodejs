// net-parent.js
const path = require('path');
let child = require("child_process").fork(path.join(__dirname, "net-child.js"));
let server = require("net").createServer();
server.on("connection", (socket) => {
    socket.end("Parent handled connection");
    console.log("parent");
});
server.listen(3000, () => {
    child.send("Parent passing down server", server);
});