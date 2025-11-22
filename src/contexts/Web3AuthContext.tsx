import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Web3Auth } from "@web3auth/single-factor-auth";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK } from "@web3auth/base";
import { ethers } from "ethers";

interface UserInfo {
  name: string;
  email: string;
  profileImage: string;
  walletAddress: string;
}

interface Web3AuthContextType {
  web3auth: Web3Auth | null;
  provider: any;
  user: UserInfo | null;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  getSigner: () => Promise<ethers.Signer | null>;
}

const Web3AuthContext = createContext<Web3AuthContextType>({
  web3auth: null,
  provider: null,
  user: null,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
  getSigner: async () => null,
});

export const useWeb3Auth = () => useContext(Web3AuthContext);

const clientId = "BFKrObgTguGLA0XOYX1IUnqR_9O9EjWKVUDzZlPcWsaJvhYO4ho8AXzRSKBGh2hSQKck5bVHB5Ji0TEM3_QHghk";

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x1",
  rpcTarget: "https://rpc.ankr.com/eth",
  displayName: "Ethereum Mainnet",
  blockExplorerUrl: "https://etherscan.io",
  ticker: "ETH",
  tickerName: "Ethereum",
};

export const Web3AuthProvider = ({ children }: { children: ReactNode }) => {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<any>(null);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const privateKeyProvider = new EthereumPrivateKeyProvider({
          config: { chainConfig },
        });

        const web3authInstance = new Web3Auth({
          clientId,
          web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
          privateKeyProvider,
        });

        await web3authInstance.init();
        setWeb3auth(web3authInstance);

        if (web3authInstance.status === "connected") {
          const web3authProvider = web3authInstance.provider;
          setProvider(web3authProvider);
          await getUserInfo(web3authProvider);
        }
      } catch (error) {
        console.error("Web3Auth initialization error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, []);

  const getUserInfo = async (web3authProvider: any) => {
    try {
      const ethersProvider = new ethers.BrowserProvider(web3authProvider);
      const signer = await ethersProvider.getSigner();
      const address = await signer.getAddress();

      const userInfo = await web3auth?.getUserInfo();
      
      setUser({
        name: userInfo?.name || "Anonymous",
        email: userInfo?.email || "",
        profileImage: userInfo?.profileImage || "",
        walletAddress: address,
      });
    } catch (error) {
      console.error("Error getting user info:", error);
    }
  };

  const login = async () => {
    if (!web3auth) {
      console.error("Web3Auth not initialized");
      return;
    }

    try {
      const web3authProvider = await web3auth.connect({
        verifier: "web3auth-sfa-verifier",
        verifierId: "web3auth@gmail.com",
        idToken: await getIdToken(),
      });

      if (web3authProvider) {
        setProvider(web3authProvider);
        await getUserInfo(web3authProvider);
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const getIdToken = async (): Promise<string> => {
    // For demo purposes, we'll use a mock flow
    // In production, implement proper Google OAuth flow
    return new Promise((resolve) => {
      const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkRlbW8gVXNlciIsImVtYWlsIjoid2ViM2F1dGhAZ21haWwuY29tIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
      resolve(mockToken);
    });
  };

  const logout = async () => {
    if (!web3auth) return;

    try {
      await web3auth.logout();
      setProvider(null);
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const getSigner = async (): Promise<ethers.Signer | null> => {
    if (!provider) return null;
    
    try {
      const ethersProvider = new ethers.BrowserProvider(provider);
      return await ethersProvider.getSigner();
    } catch (error) {
      console.error("Error getting signer:", error);
      return null;
    }
  };

  return (
    <Web3AuthContext.Provider
      value={{
        web3auth,
        provider,
        user,
        isLoading,
        login,
        logout,
        getSigner,
      }}
    >
      {children}
    </Web3AuthContext.Provider>
  );
};
