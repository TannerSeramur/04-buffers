`use strict`;
'use strict';

const fs = require('fs');

let article = new Buffer(`<article> `);
let articleClose = new Buffer(`</article> `);
let h2 = new Buffer(`<h2> `)
let h2Close = new Buffer(`</h2> `)
let h3 = new Buffer(`<h3> `)
let h3Close = new Buffer(`</h3> `)

let arr = [article, articleClose, h2, h2Close, h3, h3Close];
let tags = Buffer.concat(arr);

let stringifyBuffer = (buffer) => {
    // console.log(tags)
    let str = '';
    for(let char of buffer) {
      str += String.fromCharCode(char);
    }
    return str;
  };

function updateFile(file, stringifyBuffer) {
    fs.readFile(file, function(err, data){
        if(err){throw err;}
        let newData = stringifyBuffer(data).split('\n').filter(text => text.length>2 ? text : null).map(e => e.split('')); 
        let tagArr =  stringifyBuffer(tags).split(' ');        
        newData.forEach((line)=>{
            if(line[0]=== '1' || line[0]=== '2' || line[0]=== '3' || line[0]=== '4' || line[0]=== '5' || line[0]=== '6'){
                line.unshift(tagArr[4]);
                line.push(tagArr[5]);
            }else{
                line.unshift(tagArr[2]);
                line.push(tagArr[3]);
            }
        });
       
        let finalStr = newData.map(e => e.join('')).join('\n');
        
      fs.writeFile(file, `${tagArr[0]}${finalStr}${tagArr[1]}`, function (err) {
        if(err){throw err};
        console.log('Converted to html');
      });
    });
  }


updateFile('./pair-programming.txt',stringifyBuffer );



