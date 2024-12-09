import { Request, Response } from 'express';
import { getKeycloak } from '../../../lib/keycloak.js';

const loginSSO = async (req: Request, res: Response) => {
  const keycloak = getKeycloak();
  const redirectUri = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/callback`;
  const state = Math.random().toString(36).substring(7);
  // Redirect to Keycloak's SSO login URL
  res.redirect(
    `${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/auth` +
    `?client_id=${process.env.KEYCLOAK_CLIENT_ID}` +
    `&response_type=code` +
    `&redirect_uri=${redirectUri}` +
    `&scope=openid`+
    `&state=${state}` +
    `&prompt=login`
  );
};

export default loginSSO;
