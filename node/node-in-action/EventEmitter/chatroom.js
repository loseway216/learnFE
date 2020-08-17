const net = require("net");
const event = require("events");
const channel = new event.EventEmitter();
channel.clients = {};
channel.subscriptioins = {};
//加入
channel.on("join", function(id, client) {
  const welcome = `online:${this.listeners("broadcast").length}`;
  client.write(`${welcome}\n`);
  this.clients[id] = client;
  this.subscriptioins[id] = (senderId, msg) => {
    if (id != senderId) {
      this.clients[id].write(msg);
    }
  };
  this.on("broadcast", this.subscriptioins[id]);
});

//断开
channel.on("leave", function(id) {
  channel.removeListener("broadcast", this.subscriptioins[id]);
  channel.emit("broadcast", id, `${id} has left the chatroom.\n`);
});

//shutdown
channel.on("shutdown", function() {
  channel.emit("broadcast", "", `server shutdown.\n`);
  channel.removeAllListeners("broadcast");
});

const server = net.createServer(client => {
  const id = `${client.remoteAddress}:${client.remotePort}`;
  channel.emit("join", id, client);
  client.on("data", data => {
    data = data.toString();
    if (data === "shutdown\r\n") {
      channel.emit("shutdown");
    }
    channel.emit("broadcast", id, data);
  });
  client.on("close", () => {
    channel.emit("leave", id);
  });
});
server.listen(8888);
