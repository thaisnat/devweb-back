const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDef = {
  'basePath': '/',
  'host': 'localhost:3000',
  'info': {
    'description': 'Rede social voltada para estudos',
    'title': 'Monitoria Online',
    'version': '1.0.0'
  }
};

const options = {
  'apis': ['../**/*.docs.js'],
  'swaggerDefinition': swaggerDef
};

module.exports = swaggerJSDoc(options);