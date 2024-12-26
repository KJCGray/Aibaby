const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');
const userRoutes = require('./routes/users'); // 引入 user 路由

const app = express();

app.use(express.json());
app.use(cors());

// Swagger 設定
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Example API',
            version: '1.0.0',
            description: 'This is an example API documentation.',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Local server',
            },
        ],
    },
    apis: [path.join(__dirname, 'routes/*.js')],
};

const specs = swaggerJsdoc(swaggerOptions);

// 設置 Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// 使用 user 路由，設置路由前綴
app.use('/api', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
