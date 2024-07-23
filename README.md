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

## Features

- **JWT Generation**: Create and manage JWTs using a custom server.
- **User Verification**: Authenticate users based on predefined criteria.
- **Secure Key Management**: Utilize RSA keys for signing and verifying JWTs.
- **Integration with Particle Auth**: Connect JWT-based authentication to Particle Auth for robust user management.
- **JWT Decoding**: Extract and display user information from JWTs.

## 🔑 Particle Auth Core

Particle Auth Core, a component of Particle Network's Wallet-as-a-Service, enables seamless onboarding to an application-embedded MPC-TSS/AA wallet facilitated by social login, such as Google, GitHub, email, phone number, etc. - as an alternative to Particle Auth, the Auth Core SDK comes with more control over the modal itself, application-embedded popups rather than redirects, and so on.

## 🛠️ Quickstart

### Clone this repository
```
git clone https://github.com/soos3d/jwt-demo-particle-auth
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

Follow the instructions in the tutorial: [tutorial here]()

### Move into the front-end directory (Next JS)

```sh
cd particle-next-starter
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

## Development Next JS

Particle Auth config is in `src/app/layout.tsx`. 
