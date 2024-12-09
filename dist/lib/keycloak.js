// keycloak.ts
let Keycloak;
const loadKeycloak = async () => {
    // Dynamically import the 'keycloak-js' module
    Keycloak = (await import('keycloak-js')).default;
    // Create and return the Keycloak instance
    const keycloak = new Keycloak({
        url: 'http://localhost:8080', // Your Keycloak server URL
        realm: 'devquest', // Your Keycloak realm
        clientId: 'devquest-frontend' // Your Keycloak client ID
    });
    return keycloak;
};
export const initKeycloak = async () => {
    try {
        const keycloak = await loadKeycloak(); // Load the Keycloak instance
        const authenticated = await keycloak.init({ onLoad: 'login-required' });
        if (authenticated) {
            console.log('User is authenticated');
        }
        else {
            console.log('User is not authenticated');
        }
    }
    catch (error) {
        console.error('Error initializing Keycloak:', error);
    }
};
// Initialize Keycloak when the file is imported (optional)
initKeycloak();
// Provide a function to retrieve the Keycloak instance asynchronously
export const getKeycloakInstance = async () => {
    const keycloak = await loadKeycloak(); // Wait for the Keycloak instance
    return keycloak;
};
