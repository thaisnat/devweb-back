const express = require('express');
const index = express()

index.listen(3000, () => console.log('Server running on port 3000'));
index.use('/static', express.static(app.js + '/back'));