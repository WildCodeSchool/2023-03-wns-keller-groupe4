import React, { createContext, useState, useEffect, useContext } from 'react';
import { getTokenFromStorage } from './secureStore';

interface Props {
  children: React.ReactNode;
}

const AuthContext = createContext({
    userToken: null as string | null,
    isLoading: true,
    isConnected: false,
    loadUserToken: () => {},
});

export const AuthProvider = ({ children }: Props) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadUserToken = async () => {
      console.log('loadUserToken');
      
    try {
      const token = await getTokenFromStorage();
      setUserToken(token);
    } catch (error) {
      console.error('Error loading user token:', error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {

    loadUserToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userToken,
        isLoading,
        isConnected: !!userToken, // Indicates if the user is connected or not
        loadUserToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
