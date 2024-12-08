import axios from 'axios';
import prisma from '../lib/prisma.js'; // Adjust the path based on your project structure
import { getKeycloakAdminToken } from '../lib/keycloak.ts'; // Utility to fetch admin token

const fetchKeycloakUsers = async () => {
  try {
    console.log('Starting Keycloak user sync...');

    // Fetch Keycloak admin token
    const adminToken = await getKeycloakAdminToken();

    // Fetch users from Keycloak
    const usersResponse = await axios.get(
      `http://localhost:8080/admin/realms/${process.env.KEYCLOAK_REALM}/users`,
      {
        headers: { Authorization: `Bearer ${adminToken}` },
      }
    );

    const users = usersResponse.data;
    console.log(users)
    // Sync users to CockroachDB
    for (const user of users) {
      await prisma.user.upsert({
        where: { email: user.email },
        create: {
          username: user.username || user.email.split('@')[0], // Default to part of email if username missing
          email: user.email,
          name: `${user.firstName || ''} ${user.lastName || ''}`.trim()
        },
        update: {
          username: user.username || user.email.split('@')[0],
          name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
        },
      });
    }

    console.log('Keycloak user sync completed successfully.');
  } catch (error) {
    console.error('Error syncing users from Keycloak:', error);
  }
};

export default fetchKeycloakUsers;
