const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const txtFile = 'test.txt';

const app = express();
const port = process.env.PORT || 9000;

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',(req,res)=>{
  res.send('Hello');

  fs.readFile(txtFile,'utf8',(err, data)=>{
    if(err)
      console.log(err);

    const wordsArr = wordsSplit(data);
    const map = countFreq(wordsArr);
    const finalWordsArray = descSort(map);

    console.log(finalWordsArray);
    console.log('The word "' + finalWordsArray[0].name + '" appears the most in the file ' + finalWordsArray[0].total + ' times');

  });
});




const wordsSplit = (text) => {
  var wordsArr = text.split(/\s+/);
  return wordsArr;
}


const countFreq = (wordsArr) => {

  const map = {};

    wordsArr.forEach((k) =>{
      if(map.hasOwnProperty(k)){
        map[k]++;
      }
      else{
        map[k] = 1;
      }
    });

  return map;
}


const descSort = (map)=> {

  var finalWordsArray = [];
  finalWordsArray = Object.keys(map).map(function (key) {
    return {
      name: key,
      total: map[key]
    };
  });

  finalWordsArray.sort(function (a, b) {
    return b.total - a.total;
  });

  return finalWordsArray;
}


app.listen(port, () => console.log(`Listening on port ${port}`));
