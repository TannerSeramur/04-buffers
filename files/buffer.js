'use strict';

const fs = require('fs');

let nameArr = new Buffer(`let names = ['name1', 'name2', 'name3'];`);
let myFunc = new Buffer(`names.forEach(name => console.log(name));`)

let arr = [nameArr, myFunc];

let buff = Buffer.concat(arr);


fs.writeFile('./loop.js', buff , err => {
  if (err) {throw err; }
  console.log('created file');
});

