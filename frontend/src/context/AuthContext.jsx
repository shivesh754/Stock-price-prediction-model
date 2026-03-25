import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session from localStorage on mount
  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem('stocksight_token');
      const savedUser = localStorage.getItem('stocksight_user');

      if (token && savedUser) {
        try {
          // Verify token is still valid with backend
          const data = await authService.getMe();
          setUser(data.user);
          localStorage.setItem('stocksight_user', JSON.stringify(data.user));
        } catch {
          // Token expired or invalid — use cached user data as fallback
          // (the interceptor will auto-clear on 401)
          try {
            setUser(JSON.parse(savedUser));
          } catch {
            localStorage.removeItem('stocksight_user');
            localStorage.removeItem('stocksight_token');
          }
        }
      }
      setIsLoading(false);
    };

    restoreSession();
  }, []);

  const saveSession = useCallback((userData, token) => {
    setUser(userData);
    localStorage.setItem('stocksight_user', JSON.stringify(userData));
    if (token) {
      localStorage.setItem('stocksight_token', token);
    }
  }, []);

  const login = useCallback(async (email, password) => {
    const data = await authService.login(email, password);
    saveSession(data.user, data.token);
    return data;
  }, [saveSession]);

  const signup = useCallback(async (name, email, password) => {
    const data = await authService.register(name, email, password);
    saveSession(data.user, data.token);
    return data;
  }, [saveSession]);

  const googleLogin = useCallback(async (credential) => {
    const data = await authService.googleAuth(credential);
    saveSession(data.user, data.token);
    return data;
  }, [saveSession]);

  const githubLogin = useCallback(async (accessToken) => {
    const data = await authService.githubAuth(accessToken);
    saveSession(data.user, data.token);
    return data;
  }, [saveSession]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('stocksight_user');
    localStorage.removeItem('stocksight_token');
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      signup,
      googleLogin,
      githubLogin,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
