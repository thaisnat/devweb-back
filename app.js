const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Hello World!'));
app.post('/', (req, res) => res.send('Receiving request for POST'));
app.put('/user', (req, res) => res.send('Receiving request for PUT at /user'));
app.delete('/user', (req, res) => res.send('Receiving request for DELETE at /user'));

app.listen(3000, () => console.log('Server running on port 3000'));
