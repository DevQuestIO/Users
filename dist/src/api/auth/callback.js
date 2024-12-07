// // import { NextApiRequest, NextApiResponse } from 'next';
// // import auth from '../../authService';
// // export default async function handler(req: NextApiRequest, res: NextApiResponse) {
// //   if (req.method === 'GET') {
// //     try {
// //       const user = await auth.socialProviders.google.callback(req, res);
// //       res.status(200).json({ user });
// //     } catch (error) {
// //       res.status(500).json({ error: 'Failed to authenticate via OAuth' });
// //     }
// //   } else {
// //     res.status(405).json({ error: 'Method Not Allowed' });
// //   }
// // }
// import { Request, Response } from "express";
// import { authClient } from "../../../lib/authClient";  // Import authClient
// // Express route for handling OAuth callback
// app.get("/api/auth/callback", async (req: Request, res: Response) => {
//   try {
//     const user = await authClient.signIn.social.arguments(req, res);
//     // After successfully authenticating, you can store the user in the session or database
//     req.session.user = user;  // Store user data in session
//     res.redirect("/dashboard");  // Redirect the user to the dashboard
//   } catch (error) {
//     console.error("Error during OAuth callback", error);
//     res.status(500).send("Failed to authenticate via OAuth");
//   }
// });
