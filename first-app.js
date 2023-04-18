const http = require('http');
 
const server = http.createServer((req,res)=> {
    console.log('Dipankar');

});

server.listen(4000);