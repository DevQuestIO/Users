import express from 'express';
import session from 'express-session';
import cors from 'cors';
import Keycloak from 'keycloak-connect';
import registerUser from './api/auth/register.js';
import loginUser from './api/auth/login.js';
import cookieParser from 'cookie-parser'; 

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser()); 
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
}));

// Keycloak Setup
const memoryStore = new session.MemoryStore();
const keycloak = new Keycloak({ store: memoryStore });

app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-secret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore,
}));

app.use(keycloak.middleware());

// Routes
app.post('/api/auth/register', registerUser); // Normal registration
app.post('/api/auth/login', loginUser); // Normal login

// SSO Login Redirect to Keycloak
app.get('/api/auth/login-sso', (req, res) => {
  const state = Math.random().toString(36).substring(7);
  const redirectUri = `${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/auth?` +
    `client_id=${process.env.KEYCLOAK_CLIENT_ID}&` +
    `response_type=code&` +
    `scope=openid email&` +
    `redirect_uri=http://localhost:5002/api/auth/callback&` +
    `prompt=login&`+
    `state=${state}`;

  res.redirect(redirectUri);
});

// Handle Callback from Keycloak
// app.get('/api/auth/callback', async (req, res) => {
//   const { code } = req.query;

//   if (!code || typeof code !== 'string') {
//     return res.status(400).send('Authorization code is missing or invalid');
//   }

//   // Ensure the required environment variables are present
//   const clientId = process.env.KEYCLOAK_CLIENT_ID;
//   const clientSecret = process.env.KEYCLOAK_SECRET;

//   if (!clientId || !clientSecret) {
//     console.error('Missing CLIENT_ID or CLIENT_SECRET in environment variables');
//     return res.status(500).send('Internal server error');
//   }

//   try {
//     const tokenResponse = await fetch(`http://${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       body: new URLSearchParams({
//         grant_type: 'authorization_code',
//         client_id: clientId, // Ensure this is a string
//         client_secret: clientSecret, // Ensure this is a string
//         code, // Authorization code from query
//         redirect_uri: 'http://localhost:5002/api/auth/callback', // Your redirect URI
//       }).toString(), // Convert to a valid string format
//     });

//     const tokens = await tokenResponse.json();

//     if (tokens.error) {
//       throw new Error(tokens.error_description || 'Failed to fetch tokens');
//     }

//      // Set the token as a cookie
//      res.cookie('auth_token', tokens.access_token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'lax',
//     });    
//     console.log('Cookie set with auth_token:', tokens.access_token);
//     // Handle successful login, e.g., store tokens or create a session
//     res.redirect('http://localhost:3000/dashboard');
//   } catch (error) {
//     console.error('Error during SSO callback:', error);
//     res.status(500).send('SSO login failed');
//   }
// });

app.get('/api/auth/callback', async (req, res) => {
  const { code } = req.query;

  if (!code || typeof code !== 'string') {
    return res.status(400).send('Authorization code is missing or invalid');
  }

  // Ensure the required environment variables are present
  const clientId = process.env.KEYCLOAK_CLIENT_ID;
  const clientSecret = process.env.KEYCLOAK_SECRET;

  if (!clientId || !clientSecret) {
    console.error('Missing CLIENT_ID or CLIENT_SECRET in environment variables');
    return res.status(500).send('Internal server error');
  }

  try {
    // Exchange the authorization code for tokens
    const tokenResponse = await fetch(
      `http://localhost:8080/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: clientId,
          client_secret: clientSecret,
          code,
          redirect_uri: 'http://localhost:5002/api/auth/callback',
          scope: 'openid email profile',
        }).toString(),
      }
    );
    

    const tokens = await tokenResponse.json();

    if (tokens.error) {
      console.error('Failed to fetch tokens:', tokens.error_description);
      throw new Error(tokens.error_description || 'Failed to fetch tokens');
    }

    // Set the access token in cookies
    res.cookie('auth_token', tokens.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 3600000 // 1 hour, adjust as needed
    });
    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 3600000, // 1 hour
    });

    res.redirect('http://localhost:3000/dashboard'); // Redirect to the frontend home
  } catch (error) {
    console.error('Error during SSO callback:', error);
    res.status(500).send('SSO login failed');
  }
});



// Protected Route
app.get('/api/auth/protected', keycloak.protect(), (req, res) => {
  res.json({ message: 'This is a protected route' });
});

app.get('/api/auth/session', async (req, res) => {
  try {
    console.log('Cookies:', req.cookies);

    const authToken = req.cookies?.auth_token;
    if (!authToken) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    console.log("before userinfo")
    const userInfoResponse = await fetch(`http://localhost:8080/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/userinfo`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    const decodedToken = JSON.parse(Buffer.from(authToken.split('.')[1], 'base64').toString());
    console.log(decodedToken.scope); 
    console.log("after userinfo", userInfoResponse)
    if (!userInfoResponse.ok) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    console.log("after after userinfo")
    const userInfo = await userInfoResponse.json();
    res.json({ user: userInfo });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error', err });
  }
});

app.post('/api/auth/signout', async (req, res) => {
  try {

    // Call Keycloak logout endpoint
    const logoutUrl = `http://localhost:8080/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/logout`;
    const response = await fetch(logoutUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.KEYCLOAK_CLIENT_ID || '',
        client_secret: process.env.KEYCLOAK_SECRET || '',
        refresh_token: req.cookies.refresh_token || '', // Include refresh token if applicable
      }).toString(),
    });

    // Clear the auth_token cookie
    res.clearCookie('auth_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
    res.clearCookie('connect.sid', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to logout from Keycloak', errorText);
      return res.status(500).json({ error: 'Failed to logout from Keycloak' });
    }

    res.status(200).json({ message: 'Signed out successfully' });
  } catch (error) {
    console.error('Error during signout:', error);
    res.status(500).json({ error: 'Internal server error during signout' });
  }
});

// app.post('/api/auth/signout', (req, res) => {
//   try {
//     const logoutUrl = `${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/logout?redirect_uri=${process.env.FRONTEND_URL || 'http://localhost:3000'}`;

//     // Clear cookies on the client
//     res.clearCookie('auth_token', {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'lax',
//     });

//     res.clearCookie('connect.sid', {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'lax',
//     });
//     res.status(200).json({ message: 'Signed out successfully' });
//     // Redirect user to Keycloak logout
//     res.redirect(logoutUrl);
//   } catch (error) {
//     console.error('Error during signout:', error);
//     res.status(500).json({ error: 'Internal server error during signout' });
//   }
// });


// Start server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
