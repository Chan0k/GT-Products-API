import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Blog API Documentation',
            version: '1.0.0',
            description: 'API documentation for the Node.js Blog Application',
            contact: {
                name: 'API Developer',
                // You might add an email or URL here, e.g., email: 'dev@example.com'
            },
        },
        servers: [
            {
                url: 'http://localhost:3000/api/v1',
                description: 'Development server (Assumed base path)',
            },
        ],
        // --- Tags for grouping endpoints ---
        tags: [
            {
                name: 'Authentication',
                description: 'User registration and login',
            },
            {
                name: 'Users',
                description: 'User profile and data retrieval',
            },
            {
                name: 'Posts',
                description: 'Blog post management (CRUD)',
            },
            {
                name: 'Comments',
                description: 'Comment management for posts',
            },
            {
                name: 'Photos',
                description: 'User photo management (upload, view, delete)',
            },
        ],
        // --- Reusable Components (Security Schemes and Schemas) ---
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'JWT authorization header using the Bearer scheme.',
                },
            },
            schemas: {
                // Schema used in Auth, Users, and Posts routers
                User: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', description: 'The unique user ID.' },
                        username: { type: 'string', description: 'The user\'s username.' },
                        email: { type: 'string', format: 'email', description: 'The user\'s email address.' },
                        createdAt: { type: 'string', format: 'date-time' },
                    },
                    example: { id: 1, username: 'johndoe', email: 'john@example.com' },
                },
                // Schema used in Posts and Comments routers
                Post: {
                    type: 'object',
                    required: ['title', 'content'],
                    properties: {
                        id: { type: 'integer', readOnly: true },
                        title: { type: 'string', description: 'The title of the blog post.' },
                        content: { type: 'string', description: 'The main body content.' },
                        authorId: { type: 'integer', readOnly: true },
                    },
                    example: { id: 10, title: 'My First Post', content: 'This is the body of the post.', authorId: 5 },
                },
                // Schema used in Comments router
                Comment: {
                    type: 'object',
                    required: ['text'],
                    properties: {
                        id: { type: 'integer', readOnly: true },
                        text: { type: 'string', description: 'The content of the comment.' },
                        postId: { type: 'integer', readOnly: true },
                        authorId: { type: 'integer', readOnly: true },
                    },
                    example: { id: 50, text: 'Great article!', postId: 10, authorId: 2 },
                },
            },
        },
    },
    // --- The Path to Your JSDoc Annotated Files ---
    apis: [
        './src/routes/*.js',
        // Optional: If you want to explicitly list all files for clarity:
        // './src/routes/auth.routes.js',
        // './src/routes/user.routes.js',
        // './src/routes/post.routes.js',
        // './src/routes/photo.routes.js',
        // Add more files here as you create them
    ],
};

const specs = swaggerJsdoc(options);

export default specs;