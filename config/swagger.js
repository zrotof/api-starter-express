const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Title: example - Elites Voyages API',
        description: " here is a little descripion",
        contact: {
          name: "Samuel Mandeng",
          email: "",
          url: ""
        },
        version: '1.0.0',
      },
      servers: [
        {
          url: "http://localhost:4000/",
          description: "Local server"
        },
        {
          url: "<your live url here>",
          description: "Live server"
        },
      ]
    },
    // looks for configuration in specified directories (put route files in apis array)
    apis: ['../routes/flight/*.js'],

}

  const swaggerSpec = swaggerJsdoc(options)
  function swaggerDocs(app, port) {
    // Swagger Page
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    // Documentation in JSON format
    app.get('/docs.json', (req, res) => {
      res.setHeader('Content-Type', 'application/json')
      res.send(swaggerSpec)
    })
  }

  module.exports = { swaggerDocs }