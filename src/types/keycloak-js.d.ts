declare module 'keycloak-js' {
    export default class Keycloak {
        constructor(config?: Keycloak.KeycloakConfig);
        init(options?: Keycloak.KeycloakInitOptions): Promise<boolean>;
        login(options?: Keycloak.KeycloakLoginOptions): Promise<void>;
        logout(options?: Keycloak.KeycloakLogoutOptions): Promise<void>;
        // Add any other methods you use
    }

    namespace Keycloak {
        interface KeycloakConfig {
            url?: string;
            realm: string;
            clientId: string;
        }

        interface KeycloakInitOptions {
            onLoad?: 'login-required' | 'check-sso';
            silentCheckSsoRedirectUri?: string;
            // Add other initialization options as needed
        }

        interface KeycloakLoginOptions {
            redirectUri?: string;
        }

        interface KeycloakLogoutOptions {
            redirectUri?: string;
        }
    }
}
