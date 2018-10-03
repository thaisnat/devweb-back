const swaggerUi = require('swagger-ui-express'),
  swaggerSpec = require('./swagger.js');

module.exports = (app) => {
  app.use('/public', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};