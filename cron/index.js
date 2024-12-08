import cron from 'node-cron';
import fetchKeycloakUsers from './syncKeycloakUsers.js';

// Schedule the sync every hour
cron.schedule('* * * * * *', async () => {
  console.log('Running scheduled Keycloak user sync...');
  await fetchKeycloakUsers();
});
