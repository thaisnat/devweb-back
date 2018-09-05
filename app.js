const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Principios de Desenvolvimento Web!'));
app.post('/', (req, res) => res.send('Receiving request for POST'));
app.put('/user', (req, res) => res.send('Receiving request for PUT at /user'));
app.delete('/user', (req, res) => res.send('Receiving request for DELETE at /user'));

app.listen(3000, () => console.log('Server running on port 3000'));

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ a: 1 }));
  });

  app.use(function (req, res, next) {
      res.header('Content-Type', 'application/json');
      next();
  });
  
  app.get('/api/endpoint1', (req, res) => {
      res.send(JSON.stringify({value: 1}));
  });


const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }));


app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header('Content-Type', 'application/json');
    next();  

app.post('/', function (req, res) {

  res.end(JSON.stringify(req.body, null, 2));
  });
});