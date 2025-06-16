"use client";
import React, { useEffect, useState } from "react";
import type { NextPage } from "next";

import {
  useEthereum,
  useConnect,
  useAuthCore,
} from "@particle-network/authkit";
import { AuthType } from "@particle-network/auth-core";
import { ethers, type Eip1193Provider } from "ethers";

import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

import { formatBalance, truncateAddress } from "./utils/utils";

const Home: NextPage = () => {
  const { connect, disconnect, connectionStatus } = useConnect();
  const { address, provider, chainInfo, signMessage } = useEthereum();
  const { userInfo } = useAuthCore();

  const [jwtData, setJwtData] = useState<any>(null);
  const [balance, setBalance] = useState<string>("");

  const ethersProvider = new ethers.BrowserProvider(
    provider as Eip1193Provider,
    "any"
  );

  useEffect(() => {
    if (userInfo) {
      fetchBalance();
    }
  }, [userInfo, chainInfo]);

  const fetchBalance = async () => {
    try {
      const signer = await ethersProvider.getSigner();
      const addr = await signer.getAddress();
      const balanceRaw = await ethersProvider.getBalance(addr);
      const balanceFormatted = formatBalance(ethers.formatEther(balanceRaw));
      setBalance(balanceFormatted);
    } catch (err) {
      console.error("Error fetching balance:", err);
    }
  };

  const handleLogin = async (token: string) => {
    try {
      const decoded = jwtDecode(token);
      setJwtData(decoded);
      console.log(decoded);

      await connect({
        provider: AuthType.jwt,
        thirdpartyCode: token,
      });
    } catch (err) {
      console.error("Login failed", err);
      alert("Login failed: " + (err as any).message);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      setJwtData(null);
    } catch (err) {
      console.error("Disconnect failed", err);
    }
  };

  const signWithParticle = async () => {
    try {
      const message = "Gm Particle! Signing with Particle Auth.";
      const result = await signMessage(message);
      alert(`Signed: ${result} by ${address}`);
    } catch (err: any) {
      alert(`Signing error: ${err.message}`);
      console.error("signMessage error:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-8 bg-black text-white">
      <main className="flex-grow flex flex-col items-center justify-center w-full max-w-4xl mx-auto">
        {!userInfo ? (
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6">
              Sign in with Google + Particle
            </h1>
            <h2 className="text-xl font-semibold mb-4">
              Run your own Google Auth and generate a Particle Wallet via JWT
              Auth
            </h2>
            <GoogleLogin
              onSuccess={(res) => {
                const token = res.credential;
                if (token) handleLogin(token);
              }}
              onError={() => console.log("Google login failed")}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {/* Account Info Card */}
            <div className="border border-purple-500 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-2 text-white">
                Account Info
              </h2>
              <div className="flex flex-col space-y-1">
                <p>
                  <strong>Name:</strong> {jwtData?.name}
                </p>
                <p>
                  <strong>Email:</strong> {jwtData?.email}
                </p>
                <p>
                  <strong>Issuer:</strong> {jwtData?.iss}
                </p>
                <p>
                  <strong>Status:</strong> {connectionStatus}
                </p>
                <p>
                  <strong>Address:</strong>{" "}
                  <code>{truncateAddress(address || "")}</code>
                </p>
                <p>
                  <strong>Chain:</strong> {chainInfo.name}
                </p>
                <p>
                  <strong>Balance:</strong> {balance}{" "}
                  {chainInfo.nativeCurrency.symbol}
                </p>
              </div>
              <div className="flex flex-col space-y-4 mt-4">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={signWithParticle}
                >
                  Sign Message
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleDisconnect}
                >
                  Disconnect
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
