const cheerio = require ('cheerio');
const fetchUrl = require('fetch').fetchUrl;
const iconv = require('iconv-lite');
const fs = require('fs');


const url = 'http://www.cinema-francais.fr/monteurs.htm';



// source file is iso-8859-15 but it is converted to utf-8 automatically
fetchUrl(url, function(error, meta, body){
  const $ = cheerio.load(body.toString().replace(/[\n\t\r]/g, ''));

  let list = []

    $('b > a').filter(function(){
      let data = $(this);
      let words = data.text().split(' ');
      let json = {
        firstname : words[0],
        lastname : words[1],
      }
      list.push(json)
    })
  console.log(JSON.stringify(list));

  fs.writeFile(
      './data.json',
      JSON.stringify(list, null, 2),
      function (err) {
          if (err) {
              console.error('Crap happens');
          }
      }
  );
});
