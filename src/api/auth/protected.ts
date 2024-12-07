import { Request, Response } from 'express';
import { getKeycloak } from '../../../lib/keycloak'; // Adjust path as necessary

const keycloak = getKeycloak();

const protectedRoute = (req: Request, res: Response) => {
  res.json({ message: 'This is a protected route, accessible only via SSO' });
};

export default [keycloak.protect(), protectedRoute];
