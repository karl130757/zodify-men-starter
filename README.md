# Zod Mongoose Express Node Backend Template

## Description

The **Zod Mongoose Express Node Backend Template** is a robust and scalable backend framework designed for modern web applications. Built with **Node.js** and **TypeScript**, this template integrates **Zod** for schema validation, **Mongoose** for database management, and **Express.js** for routing and middleware handling. It also includes essential security and performance enhancements, making it an ideal starting point for secure and efficient API development.

## Technology Stack

-   **Node.js** – Server-side JavaScript runtime
-   **Express.js** – Lightweight and fast web framework
-   **TypeScript** – Strongly typed JavaScript for better code quality
-   **Zod** – Type-safe schema validation
-   **Mongoose** – MongoDB object modeling for Node.js

## Features

-   **Security Enhancements**:
    -   Helmet for setting HTTP headers securely (template configuration provided; modify as needed)
    -   CORS (Cross-Origin Resource Sharing) support (template configuration provided; modify as needed)
    -   Rate Limiter to prevent abuse and DDoS attacks (template configuration provided; modify as needed)
-   **Authentication & Authorization**:
    -   JWT-based authentication
    -   Token regeneration for secure session management
    -   Role-Based Access Control (RBAC) for user permissions
-   **Best Practices**:
    -   Structured and modular codebase
    -   Scalable and maintainable architecture
    -   Environment variable configuration
    -   **Naming Conventions**:
        -   Filenames should follow **camelCase**.
        -   Functions should be written in **camelCase** consistently.
        -   Classes should follow **PascalCase**.
    -   **Constants Management**:
        -   A `constants` folder contains application-wide constant values.
        -   The `global.ts` file inside the `constants` folder is the central location for defining and retrieving global constants.
    -   **Error & Response Handling**:
        -   A `global error middleware` handler is enforced to ensure consistent error handling throughout the application..
        -   A unified `response handler` is implemented to standardize API responses for better consistency and maintainability.

## RBAC Configuration

### Role-Based Access Control (RBAC)

This configuration defines role-based permissions within the system. Each role contains specific permissions for accessing and modifying data.

**Structure:**

-   Each role has a `name` and a set of `permissions`.
-   `permissions` define the domain (resource) a role can interact with, the allowed actions, and the fields the role can view.
-   **Actions should follow the format:** `action:domainName` (e.g., `create:user`, `read:order`).
-   **Fields should follow the format:** `view:fieldName` (e.g., `view:email`, `view:username`).

**Roles:**

1. **Admin:**

    - Has full access to the `user` domain.
    - **Allowed Actions:** Create, Read, Update, Delete, Search.
    - **Fields Viewable:** All user-related fields, including sensitive information (e.g., password).

2. **User:**
    - Limited access to the `user` domain.
    - **Allowed Actions:** Read, Update, Search.
    - **Fields Viewable:** User details except for sensitive information like passwords.

**RBAC Role Setup Example:**

```javascript
const roleSetup = [
	{
		name: 'Admin',
		permissions: [
			{
				domainName: 'user',
				actions: ['create:user', 'read:user', 'update:user', 'delete:user'],
				fields: ['view:id', 'view:username', 'view:email', 'view:password', 'view:role', 'view:createdAt', 'view:updatedAt']
			}
		]
	},
	{
		name: 'User',
		permissions: [
			{
				domainName: 'user',
				actions: ['read:user'],
				fields: ['view:id', 'view:username', 'view:email', 'view:createdAt', 'view:updatedAt']
			}
		]
	}
];
```

**Example Usage:**

-   The system enforces access control using this configuration.
-   When a user performs an action, their role's permissions should be checked against this setup.

**Building Permissions:**
After making changes to the RBAC configuration, run the following command to rebuild permissions:

```sh
npm run build:roles
```

## Global Constants Configuration

### Application-wide Constants

This configuration centralizes the definition and retrieval of global constants used across the application. It ensures a single source of truth for important settings.

**Structure:**

-   The `constants` folder contains all constant values.
-   The `global.ts` file inside the `constants` folder is responsible for handling environment variables and global configurations.
-   It uses the `dotenv` package to load environment variables securely.

**Global Configuration Example:**

```typescript
import dotenv from 'dotenv';

dotenv.config();

const getEnv = (key: string, fallback?: string): string => {
	const value = process.env[key];
	if (value === undefined) {
		if (fallback !== undefined) {
			return fallback;
		}
		throw new Error(`Missing environment variable: ${key}`);
	}
	return value;
};

export const config = {
	port: parseInt(getEnv('PORT', '3000'), 10),
	environment: getEnv('NODE_ENV', 'development'),
	allowedOrigins: getEnv('ALLOWED_ORIGINS', 'http://localhost:3000'),
	jwt: {
		secret: getEnv('JWT_SECRET')
	},
	bcrypt: {
		rounds: getEnv('BCRYPT_HASHROUND')
	},
	mongo: {
		uri: getEnv('MONGODB_URI'),
		database: getEnv('MONGODB_DBNAME')
	}
};
```

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
PORT=3000
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:3000
JWT_SECRET=your_jwt_secret
BCRYPT_HASHROUND=10
MONGODB_URI=mongodb://localhost:27017/your-database
MONGODB_DBNAME=your-database-name
```

Modify these values according to your project requirements.

## Installation & Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/karl130757/zodify-men-starter.git
    ```
2. Navigate to the project folder:
    ```sh
    cd zodify-men-starter/backend
    ```
3. Install dependencies:
    ```sh
    npm install
    ```
4. Configure environment variables in a `.env` file.
5. Start the development server:
    ```sh
    npm run dev
    ```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve this template.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
