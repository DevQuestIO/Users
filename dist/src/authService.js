// // import { betterAuth } from 'better-auth';
// // export const auth = betterAuth({
// //   appName: process.env.APP_NAME || 'Better Auth',
// //   baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:5002',
// //   secret: process.env.BETTER_AUTH_SECRET,
// //   enableSSO: true,
// //   enable2FA: true,
// //   socialProviders: {
// //     google: {
// //       clientId: process.env.GOOGLE_CLIENT_ID!,
// //       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
// //       redirectUri: process.env.REDIRECT_URI || 'http://localhost:5002/api/auth/callback', // The callback URL
// //     },
// //   },
// //   session: {
// //     expiresIn: 60 * 60 * 24 * 7, // 7 days
// //     storeSessionInDatabase: true,
// //   },
// //   database: {
// //     dialect: 'postgres',
// //     type: 'PostgresPool',
// //   },
// // });
// // export default auth;
// import { authClient } from '../lib/authClient';
// // Initialize the auth client with your settings
// const auth = authClient({
//   baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:5002',  // The backend URL
//   secret: process.env.BETTER_AUTH_SECRET,  // Secret for encryption, signing, etc.
//   appName: process.env.APP_NAME || 'Better Auth',  // Application name
//   enableSSO: true,  // Enable Single Sign-On
//   enable2FA: true,  // Enable Two-Factor Authentication
//   // Configure your social login providers
//   socialProviders: {
//     google: {
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//       redirectUri: process.env.REDIRECT_URI || 'http://localhost:5002/api/auth/callback', // Redirect URI
//     },
//   },
//   // Session and database configuration
//   session: {
//     expiresIn: 60 * 60 * 24 * 7,  // 7 days
//     storeSessionInDatabase: true,
//   },
//   database: {
//     dialect: 'postgres',
//     type: 'PostgresPool',  // Configure with your database type
//   },
// });
// export default auth;
