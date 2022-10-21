const net = require('net');
const { PORT, ENCODING } = require('./constants.js');
const fs = require('fs');

const server = net.createServer();

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

server.on('connection', (connection) => {
  console.log(`A client has connected`);
  connection.setEncoding(ENCODING);

  connection.write('Please select file...');

  connection.on('data', (data) => {

    fs.access(data, (err) => {

      if (err) { // file does not exist
        connection.write(`file ${data} does not exist...`);
    
      } else { // file exists, try to transfer it
        connection.write(`transferring ${data}...`);
      }
    });

  });
});
