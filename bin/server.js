'use strict';
const app = require("../src/app");
const debug = require('debug')('nodestr:server');
const http = require('http');

const port = nomalizePort(process.env.PORT || '3000');
app.set('port',  port);

const server  = http.createServer(app);

// inicia o  servidor
server.listen(port, () => console.log(`Run on port:${port}`));
// onError
server.on('error', onError);
server.on('listening', onListening);

function nomalizePort(val) {
  const port  = parseInt(val, 10);
  if(isNaN(port)) {
    return val;
  }
  if(port >= 0){
    return port;
  }
  return false;
}

// tratando erros
function onError(error) {
  if(error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port ==='string' ? 
    'Pipe ' + port :
    'Port ' + port;
  switch (error.code) {
    case 'EACCES':
        console.error(bind + ' requires elevated privilegies.' );
        process.exit(1);
    case 'EADDRINUSE':
        console.error(bind + ' is already in use.');
        process.exit(1);
    default:
        throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ?
    'pipe ' + addr :
    'port ' + addr.port;
  debug(`Listening on ${bind}`);
}