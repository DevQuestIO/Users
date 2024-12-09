// keycloak.ts
import Keycloak from 'keycloak-connect';
import session from 'express-session';

const memoryStore = new session.MemoryStore(); // Create a session store for Keycloak

const keycloak = new Keycloak({ store: memoryStore });

export const getKeycloak = () => keycloak;

export const initKeycloakMiddleware = (app: any) => {
  app.use(
    session({
      secret: 'your-secret',
      resave: false,
      saveUninitialized: true,
      store: memoryStore,
    })
  );

  app.use(keycloak.middleware());
};
