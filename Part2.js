`use strict`;
'use strict';

const fs = require('fs');

let article = new Buffer(`<article>`);
let articleClose = new Buffer(`</article>`);
let h2 = new Buffer(`<h2>`)
let h2Close = new Buffer(`</h2>`)
let h3 = new Buffer(`<h3>`)
let h3Close = new Buffer(`</h3>`)

let tags = [article, articleClose, h2, h2Close, h3, h3Close];



let stringifyBuffer = (buffer) => {
    console.log(tags)
    let str = '';
    for(let char of buffer) {
      str += String.fromCharCode(char);
    }
    return str.split('\n').filter(text => text.length>2 ? text : null).map(e => e.split(''));
  };
  

function updateFile(file, stringifyBuffer) {
    fs.readFile(file, function(err, data){
      if(err){throw err;}
  
      console.log(stringifyBuffer(data).map((e)=> /^[1-9][0-9]*$/.test(e[0]) ? e.push(tags[5]) : e.push(tags[3])));
  
    //   fs.writeFile(file, newValue, function (err) {
    //     if(err){throw err};
    //     console.log('new text is',fs.readFileSync(file).toString());
    //   });
    });
  }


updateFile('./files/pair-programming.txt',stringifyBuffer );



