var fs = require('fs');

//Convertendo binario em arquivo
const base64_decode = (base64str,fileName) => {
  var bitmap = new Buffer.from(base64str, 'base64');
  fs.writeFileSync('src/temp/'+fileName+'',bitmap, 'binary', function (err){
    if(err){
      console.log('Conversao com erro');
    }
  } );
}

//Convertendo arquivo em binário
const base64_encode = (fileName) => {
  var bitmap = fs.readFileSync('src/temp/'+fileName+'');
  return new Buffer.from(bitmap).toString('base64');
}

module.exports = {
  base64_decode,
  base64_encode
}