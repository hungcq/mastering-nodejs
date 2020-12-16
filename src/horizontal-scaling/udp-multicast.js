const dgram = require("dgram");
let socket = dgram.createSocket('udp4');
let multicastAddress = '230.3.2.1';
let multicastPort = 5554;
socket.bind(multicastPort);
socket.on("listening", function() {
  this.setMulticastTTL(64);
  this.addMembership(multicastAddress);
});

dgram.createSocket('udp4').on('message', (message, remote) => {
  console.log(`Client1 received message ${message} from ${remote.address}:${remote.port}`);
}).bind(multicastPort, multicastAddress);
dgram.createSocket('udp4').on('message', (message, remote) => {
  console.log(`Client2 received message ${message} from ${remote.address}:${remote.port}`);
}).bind(multicastPort, multicastAddress);

let cnt = 1;
let sender;
(sender = function() {
  let msg = Buffer.from(`This is message #${cnt}`);
  socket.send(
    msg,
    0,
    msg.length,
    multicastPort,
    multicastAddress
  );
  ++cnt;
  setTimeout(sender, 1000);
})();