<div align="center">
  <a href="https://particle.network/">
    <img src="https://i.imgur.com/xmdzXU4.png" />
  </a>
  <h3>
 @particle-network/auth-core Demo Application 
  </h3>
</div>

# Integrate JWT with Particle Auth

Demo application showcasing how to use custom JWT authentication with Particle Auth.

This repository demonstrates how to integrate JSON Web Tokens (JWTs) with Particle Auth to create a secure and efficient authentication system for your dApp. By leveraging JWTs, this app ensures stateless and scalable user authentication, enabling seamless login experiences for users.

> Find the full tutorial on the Particle Network's docs: [Custom Authentication via JWT ](https://developers.particle.network/docs/custom-authentication-jwt)

## Features

- **JWT Generation**: Create and manage JWTs using a custom server.
- **User Verification**: Authenticate users based on predefined criteria.
- **Secure Key Management**: Utilize RSA keys for signing and verifying JWTs.
- **Integration with Particle Auth**: Connect JWT-based authentication to Particle Auth for robust user management.
- **JWT Decoding**: Extract and display user information from JWTs.

The server includes a simulated user in a database.

```js
// Simulate a user in a DB
const PREDETERMINED_USERNAME = 'David';
const PREDETERMINED_USER_ID = '1234567';
```

## 🔑 Particle Auth Core

Particle Auth Core, a component of Particle Network's Wallet-as-a-Service, enables seamless onboarding to an application-embedded MPC-TSS/AA wallet facilitated by social login, such as Google, GitHub, email, phone number, etc. - as an alternative to Particle Auth, the Auth Core SDK comes with more control over the modal itself, application-embedded popups rather than redirects, and so on.

## 🛠️ Quickstart

### Clone this repository
```
git clone https://github.com/Particle-Network/jwt-demo-particle-auth.git
```

### Move into the server directory

```sh
cd jwt-server
```

### Install dependencies

```sh
npm ci
```

### Start the server

```sh
node index
```

> Ensure the server is exposed to the Internet, either by deploying it to a cloud or using [Ngrok](https://ngrok.com/docs). 

### Configure the Particle Dashboard

Follow the instructions in the tutorial: [Custom Authentication via JWT ](https://developers.particle.network/docs/custom-authentication-jwt)

### Move into the front-end directory (Next JS)

```sh
cd particle-auth-frontend
```

### Install dependencies

```sh
yarn install
```

Or

```sh
npm install
```

### Set environment variables
This project requires several keys from Particle Network to be defined in `.env`. The following should be defined:
- `NEXT_PUBLIC_PROJECT_ID`, the ID of the corresponding application in your [Particle Network dashboard](https://dashboard.particle.network/#/applications).
- `NEXT_PUBLIC_CLIENT_KEY`, the ID of the corresponding project in your [Particle Network dashboard](https://dashboard.particle.network/#/applications).
-  `NEXT_PUBLIC_APP_ID`, the client key of the corresponding project in your [Particle Network dashboard](https://dashboard.particle.network/#/applications).

### Start the project
```sh
npm run dev
```

Or

```sh
yarn dev
```

## Google Auth via JWT with Particle

The main demo showcases how to implement JWT auth from scratch by running your own JWT server. You can also use providers like Google, GitHub, etc. to generate JWTs and use them with Particle Auth.

The following example shows how to implement Google auth via JWT with Particle Auth.

1. **Google OAuth Integration**: The application uses `@react-oauth/google` to implement Google Sign-In functionality.

Generate your Google OAuth client ID and secret from the [Google Cloud Console](https://console.cloud.google.com/). 

Add the following environment variables to your `.env` file:

```sh
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

Then set up the layout.tsx file in the `src/app/layout.tsx` file:

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { GoogleOAuthProvider } from "@react-oauth/google";

const inter = Inter({ subsets: ["latin"] });

import { ParticleAuthkit } from "@/app/components/Authkit";

export const metadata: Metadata = {
  title: "Particle Auth App",
  description: "An application leveraging Particle Auth for social logins.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
        >
          <ParticleAuthkit>{children}</ParticleAuthkit>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
```

2. **JWT Processing**: When a user successfully authenticates with Google, the application receives a JWT token from Google's OAuth service.

3. **JWT Decoding**: The application uses `jwt-decode` to extract user information from the token (name, email, etc.).

4. **Particle Auth Connection**: The JWT token is passed to Particle's Auth system using:
   ```javascript
   await connect({
     provider: AuthType.jwt,
     thirdpartyCode: token,
   });
   ```

  You can find a full demo in the `src/app/google_example.tsx` file.

5. **Wallet Creation**: Particle uses this JWT to authenticate the user and create or access their wallet.

6. **User Experience**: Once authenticated, users can view their wallet address, balance, and perform blockchain actions like signing messages.


## Development Next JS

Particle Auth config is in `src/app/layout.tsx`. 

Edit the app from `src/app/page.tsx`. 
