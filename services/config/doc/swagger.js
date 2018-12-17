const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDef = {
  'basePath': '/',
  'host': 'localhost:8000',
  'info': {
    'description': 'Rede social voltada para o auxilio nos estudos.',
    'title': 'Me ajudaaaaa !!',
    'version': '1.0.0',
    'license': {
      'name': 'Me ajudaaaaa !!',
      'url': 'https://github.com/thaisnat/devweb-back'
    }
  },
  'consumes': [
    'application/json'
  ],
  'produces': [
    'application/json'
  ],
  'paths': {
    '/usuario': {
      'get': {
        'tags': [
          'User'
        ],
        'summary': 'Get all users',
        'responses': {
          '200': {
            'description': 'OK',
            'schema': {
              '$ref': '#/definitions/User'
            }
          }
        }
      },
      'post': {
        'tags': [
          'User'
        ],
        'summary': 'Create a new user',
        'parameters': [
          {
            'name': 'username',
            'in': 'body',
            'description': 'Username of the user that we want to create.',
            'required': true,
            'schema': {
              '$ref': '#/definitions/User'
            }
          },
          {
            'name': 'password',
            'in': 'body',
            'description': 'Password of the user that we want to create.',
            'required': true,
            'schema': {
              '$ref': '#/definitions/User'
            }
          },
        ],
        'produces': [
          'application/json'
        ],
        'responses': {
          '201': {
            'description': "{'result': {New user created}}"
          }
        }
      }
    },
    '/user/{username}': {
      'get': {
        'tags': [
          'User'
        ],
        'summary': 'Get user by username',
        'parameters': [
          {
            'name': 'username',
            'in': 'path',
            'description': 'username of the user we want to find',
            'required': true,
            'type': 'string'
          }
        ],
        'responses': {
          '200': {
            'description': 'The user was found',
            'schema': {
              '$ref': "#/definitions/User"
            }
          }
        }
      },
      'put': {
        'tags': [
          'User'
        ],
        'summary': 'Update user with given username',
        'parameters': [
          {
            'name': 'username',
            'in': 'path',
            'description': 'username of the user we want to update',
            'required': true,
            'type': 'string'
          },
          {
            'name': 'user',
            'in': 'body',
            'description': 'user with updated properties',
            'required': false,
            'schema': {
              '$ref': '#definitions/User'
            }
          }
        ],
        'responses': {
          '200': {
            'description': "{'result': {User updated}}"
          }
        }
      },
      'delete': {
        'tags': [
          'User'
        ],
        'summary': 'Delete user with given username',
        'parameters': [
          {
            'name': 'username',
            'in': 'path',
            'description': 'username of the user we want to delete',
            'required': true,
            'type': 'string'
          }
        ],
        'responses': {
          '200': {
            'description': "{'message': {User deleted}}"
          }
        }
      }
    }
  }
};

const options = {
  'apis': ['../**/*.docs.js'],
  'swaggerDefinition': swaggerDef
};

module.exports = swaggerJSDoc(options);