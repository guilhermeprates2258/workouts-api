import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Workouts API',
      version: '1.0.0',
      description: 'API para gerenciamento de treinos e usuários',
    },
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "connect.sid",
        },
      },
    }, // ✅ FECHA AQUI

    servers: [
      {
        url: 'https://workouts-api-t7n6.onrender.com',
      },
    ],
  },

  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;