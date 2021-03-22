const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('EMR');
});

app.get('/About', (req,res) =>{
    res.send('About Clinic');
});

app.get('/About', (req,res) =>{
    res.send('About Clinic');
});

app.get('/SearchClinic', (req,res) =>{
    res.send('SearchClinic');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});