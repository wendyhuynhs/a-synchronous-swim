const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messages = require('./messageQueue')

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  var filename = __dirname + req.url;
  // console.log(filename)
  // var readStream = fs.createReadStream(filename)
  // readStream.on('open', function () {
  //   readStream.pipe(res);
  // })  
  // console.log(req.files)

 if (req.method === 'GET') {
   if(req.url === '/background') {
     let result;
     fs.readFile('test.txt', 'utf8', (err, data) => {       
       result = data
      // console.log(result)
     })
     res.writeHead(200, headers);
     res.end(result); // <--- image path returned here??
   } else {
     res.writeHead(200, headers);
     res.end(messages.dequeue());
   }
 } else if (req.method === 'POST') { 
   if (req.url === '/background') {
     console.log(req)
     fs.writeFile('test.txt', '1.jpg')
     res.writeHead(200, headers)
     res.end('Successful')
   }
 } else {
   res.statusCode = 404;
   res.end()
 }
};

