const express = require('express');
const request = express.request;
const response = express.response;
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express')
const packageJson = require('../package.json');
const version = packageJson.version;

const app = express();

const options = {
    definition : {
        openapi: '3.0.0',
        info: {
            title: 'PAYSLAB REST API DOC',
            version: version,
            description : 'A Simple Express Library API and documented with Swagger',
            contact: {
                name: "Giriraj Soni",
                url: "https://giriraj-soni-dev.vercel.app",
                email:"girirajsoni1999@gmail.com"
            }
        },
        components: {
            securitySchema: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        },
        security: [
            {
                bearerAuth: [],
            }
        ],
        servers: [
            {
                url:"http://localhost:3000"
            }
        ]
    },
    apis: ['./routes/*.js']
}

const specs = swaggerJsdoc(options);


function swaggerDoc(app, port){
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs, {explorer: true}));
    app.get('docs.json', (request, response) => {
        response.setHeader('Content-Type', 'application/json');
        response.send(specs);
    })
}

module.exports = swaggerDoc;


