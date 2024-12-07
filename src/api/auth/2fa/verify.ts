// import { NextApiRequest, NextApiResponse } from 'next';
// import auth from '../../../authService';  // Import the BetterAuth instance

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     try {
//       const { userId, code } = req.body;  // Get userId and code from request body
//       const isValid = await auth.verify2FACode(userId, code);  // Verify the 2FA code

//       if (isValid) {
//         res.status(200).json({ success: true });
//       } else {
//         res.status(400).json({ error: 'Invalid 2FA code' });
//       }
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to verify 2FA code' });
//     }
//   } else {
//     res.status(405).json({ error: 'Method Not Allowed' });
//   }
// }
