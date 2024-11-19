"use client";

// Particle imports
import { AuthType } from "@particle-network/auth-core";
import { sepolia, baseSepolia } from "@particle-network/authkit/chains";
import { AuthCoreContextProvider } from "@particle-network/authkit";
import { EntryPosition } from "@particle-network/wallet";

export const ParticleAuthkit = ({ children }: React.PropsWithChildren) => {
  return (
    <AuthCoreContextProvider
      options={{
        // All env variable must be defined at runtime
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
        clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY!,
        appId: process.env.NEXT_PUBLIC_APP_ID!,

        // This is how you limit the options available.
        // Configure for JWT only.
        // authTypes: [AuthType.jwt],
        themeType: "dark",
        wallet: {
          // Set to false to remove the embedded wallet modal
          visible: true,
        },
        promptSettingConfig: {
          promptPaymentPasswordSettingWhenSign: false,
        },
        chains: [sepolia, baseSepolia],
      }}
    >
      {children}
    </AuthCoreContextProvider>
  );
};
