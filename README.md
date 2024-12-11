# Users Service

## Overview
The **Users Service** is responsible for handling authentication, authorization, and user profile management for the application. It is a key component of the DevQuestIO project, ensuring secure and flexible user authentication.

## Tech Stack
- **Node.js**
- **Express.js**
- **Keycloak**

## Features

### Keycloak Integration
1. **Two-Factor Authentication (2FA):** 
   - Provides enhanced security by requiring an additional verification step during login.
2. **Single Sign-On (SSO):** 
   - Simplified authentication process using external identity providers like Google.
3. **Flexible Authentication Options:** 
   - Supports both username/password login and external identity providers.
4. **Customizable Realms:** 
   - Configured realms in Keycloak to manage authentication rules and policies for the application.

### Secure Login Flow
- Integrated Keycloak to enable robust login flows.
- Ensures secure token-based authentication for all API calls.

## API Endpoints

Below are the APIs exposed by the Users Service:

### Authentication
1. **Login**
   - **Endpoint:** `POST /auth/login`
   - **Description:** Handles user login with username/password or via SSO.
2. **Logout**
   - **Endpoint:** `POST /auth/logout`
   - **Description:** Ends the user session and invalidates the token.
3. **Refresh Token**
   - **Endpoint:** `POST /auth/refresh`
   - **Description:** Refreshes the user's access token.

### User Management
1. **Create User**
   - **Endpoint:** `POST /users`
   - **Description:** Registers a new user in the system.
2. **Get User Profile**
   - **Endpoint:** `GET /users/:id`
   - **Description:** Retrieves the profile information of a specific user.
3. **Update User Profile**
   - **Endpoint:** `PUT /users/:id`
   - **Description:** Updates user profile details.
4. **Delete User**
   - **Endpoint:** `DELETE /users/:id`
   - **Description:** Deletes a user from the system.

### Role and Permission Management
1. **Assign Role to User**
   - **Endpoint:** `POST /roles/assign`
   - **Description:** Assigns a specific role to a user.
2. **Get User Roles**
   - **Endpoint:** `GET /roles/:userId`
   - **Description:** Retrieves all roles assigned to a user.

## Keycloak Setup
1. **Realm Configuration:**
   - Set up a realm in Keycloak with specific authentication flows and policies.
2. **Client Configuration:**
   - Register a client for the frontend application to enable secure communication.
3. **Environment Variables:**
   - Configure Keycloak environment variables (e.g., realm name, client ID, secret).

## Running Locally
### Prerequisites
- Node.js installed.
- Keycloak running locally or accessible via a server.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/DevQuestIO/Users.git
   cd Users
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   - Create a `.env` file with the following:
     ```env
     KEYCLOAK_REALM=devquest
     KEYCLOAK_CLIENT_ID=your-client-id
     KEYCLOAK_CLIENT_SECRET=your-client-secret
     KEYCLOAK_URL=http://localhost:8080
     PORT=5000
     ```
4. Start the server:
   ```bash
   npm start
   ```
