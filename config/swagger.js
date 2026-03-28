import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Workouts API',
      version: '1.0.0',
      description: 'API para gerenciamento de treinos e usuários',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js'], // onde ele vai ler os comentários
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;