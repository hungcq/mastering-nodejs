// tcpparent.js
const fork = require('child_process').fork;
const net = require('net');
let children = [];
require('os').cpus().forEach((f, idx) => {
  children.push(fork('./tcp-child.js', [idx]));
});
net.createServer((socket) => {
  let rand = Math.floor(Math.random() * children.length);
  children[rand].send(null, socket);
}).listen(8080)