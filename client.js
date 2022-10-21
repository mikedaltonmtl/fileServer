const net = require('net');
const { PORT, HOST, ENCODING } = require('./constants.js');

const config = {
  host: HOST,
  port: PORT,
};

const client = net.createConnection(config);
client.setEncoding(ENCODING);

client.on('data', (data) => {
  console.log(data);
});

process.stdin.on('data', (data) => {
  data = String(data).trim();
  client.write(data);
});

// client.on('close', () => process.exit()); // exit if server closes connection
