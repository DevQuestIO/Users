import { jsx as _jsx } from "react/jsx-runtime";
// import { Request, Response } from 'express';
// import bcrypt from 'bcryptjs';
// import prisma from '../../../lib/prisma';  // Adjust the path to where you configure Prisma
// const loginUser = async (req: Request, res: Response) => {
//   if (req.method === 'POST') {
//     const { username, password } = req.body;
//     if (!username || !password) {
//       return res.status(400).json({ error: 'Missing required fields' });
//     }
//     try {
//       // Find user by username or email
//       const user = await prisma.user.findFirst({
//         where: {
//           OR: [{ username }, { email: username }],
//         },
//       });
//       if (!user) {
//         return res.status(401).json({ error: 'Invalid credentials' });
//       }
//       // Compare the provided password with the hashed password in the database
//       const isPasswordValid = await bcrypt.compare(password, user.password);
//       if (!isPasswordValid) {
//         return res.status(401).json({ error: 'Invalid credentials' });
//       }
//       // Authentication successful, return user information
//       res.status(200).json({
//         user: {
//           id: user.id,
//           username: user.username,
//           email: user.email,
//         },
//         message: 'Login successful',
//       });
//     } catch (error) {
//       console.error('Login error:', error);
//       res.status(500).json({ error: 'Login failed. Please try again.' });
//     }
//   } else {
//     res.status(405).json({ error: 'Method not allowed' });
//   }
// };
// export default loginUser;
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { initKeycloak } from "../../../lib/keycloak";
const Login = () => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    useEffect(() => {
        const initializeKeycloak = async () => {
            try {
                await initKeycloak();
                setLoading(false);
                router.push("/dashboard"); // Redirect to dashboard after login
            }
            catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        initializeKeycloak();
    }, []);
    // const logout = () => {
    //   const keycloak = getKeycloakInstance();
    //   if (keycloak) {
    //     keycloak.logout();
    //   }
    // };
    if (loading)
        return _jsx("div", { children: "Loading..." });
    // return (
    //   <div>
    //     <button onClick={logout}>Logout</button>
    //   </div>
    // );
};
export default Login;
