import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../../../lib/prisma'; // Adjust the path to your Prisma client

const loginUser = async (req: Request, res: Response) => {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      const user = await prisma.user.findFirst({
        where: {
          OR: [{ username }, { email: username }],
        },
      });

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      res.status(200).json({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
        message: 'Login successful',
      });
      // res.json({ message: 'Login successful' });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Login failed. Please try again.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default loginUser;
