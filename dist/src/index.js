import express from 'express';
import session from 'express-session';
import cors from 'cors';
import registerUser from './api/auth/register.js'; // Add `.js` for ESM
import login from './api/auth/login.js';
import Keycloak from 'keycloak-connect';
const app = express();
process.env.KEYCLOAK_JSON = './keycloak.json'; // Set the Keycloak JSON path
// CORS configuration for frontend (localhost:3000)
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Change as needed
    methods: ['GET', 'POST'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
const memoryStore = new session.MemoryStore();
app.use(session({
    secret: 'my-secret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
}));
// Add routes
app.post('/api/auth/register', registerUser);
app.post('/api/auth/login', login);
const keycloak = new Keycloak({ store: memoryStore });
app.use(keycloak.middleware());
// Protect routes using Keycloak
app.get("/api/protected", keycloak.protect(), (req, res) => {
    res.send("This is a protected route");
});
// Start server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
