import express from 'express';
import cors from 'cors';
import registerUser from './api/auth/register';  // Adjust import paths
import loginUser from './api/auth/login';  // Adjust import paths

const app = express();

// Enable CORS for frontend (localhost:3000, adjust if different)
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',  // Fallback to localhost in development
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());  // Middleware to parse JSON body

// Define routes (example)
app.post('/api/auth/register', registerUser);  // Register route
app.post('/api/auth/login', loginUser);  // Login route

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
