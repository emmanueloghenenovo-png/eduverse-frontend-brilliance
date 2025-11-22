import { createContext, useContext, useState, ReactNode } from "react";

interface UserInfo {
  name: string;
  email: string;
  profileImage: string;
  walletAddress: string;
}

interface Web3AuthContextType {
  user: UserInfo | null;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const Web3AuthContext = createContext<Web3AuthContextType>({
  user: null,
  isLoading: false,
  login: async () => {},
  logout: async () => {},
});

export const useWeb3Auth = () => useContext(Web3AuthContext);

export const Web3AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async () => {
    setIsLoading(true);
    
    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate a mock wallet address
    const mockWalletAddress = "0x" + Math.random().toString(16).substr(2, 40);
    
    setUser({
      name: "Demo User",
      email: "demo@eduverse.app",
      profileImage: "",
      walletAddress: mockWalletAddress,
    });
    
    setIsLoading(false);
  };

  const logout = async () => {
    setUser(null);
  };

  return (
    <Web3AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </Web3AuthContext.Provider>
  );
};
