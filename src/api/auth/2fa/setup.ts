// import { NextApiRequest, NextApiResponse } from 'next';
// import {auth} from '../../../authService';  // Import the BetterAuth instance

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     try {
//       const userId = req.body.userId;  // Get userId from request body
//       const user = await auth.setup2FA(userId);  // Set up 2FA for the user

//       // Return the QR code URL to the frontend for the user to scan in their authenticator app
//       res.status(200).json({ qrCodeUrl: user.qrCodeUrl });
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to set up 2FA' });
//     }
//   } else {
//     res.status(405).json({ error: 'Method Not Allowed' });
//   }
// }
