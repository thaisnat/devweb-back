const swaggerUi = require('swagger-ui-express'),
  swaggerSpec = require('./swagger.js');

module.exports = (docRoute) => {
  docRoute.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};