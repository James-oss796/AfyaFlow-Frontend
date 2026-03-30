import React, { createContext, useContext, useState, useEffect } from 'react';

export type Role = 'Admin' | 'Receptionist' | 'Doctor';

export interface User {
  id: string;
  username: string;
  fullName: string;
  role: Role;
  departmentId?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: Omit<User, 'id'>, password: string) => Promise<boolean>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_STORAGE_KEY = 'afyaflow_users';
const SESSION_STORAGE_KEY = 'afyaflow_session';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize users if empty
  useEffect(() => {
    const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
    if (!storedUsers) {
      const initialUsers = [
        {
          id: '1',
          username: 'admin',
          password: 'admin123',
          fullName: 'System Admin',
          role: 'Admin' as Role,
        },
      ];
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(initialUsers));
    }

    // Check for existing session
    const session = localStorage.getItem(SESSION_STORAGE_KEY);
    if (session) {
      setUser(JSON.parse(session));
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    const storedUsers = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
    const foundUser = storedUsers.find(
      (u: any) => u.username === username && u.password === password
    );

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(SESSION_STORAGE_KEY);
  };

  const register = async (userData: Omit<User, 'id'>, password: string): Promise<boolean> => {
    const storedUsers = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
    
    // Simple duplicate check
    if (storedUsers.some((u: any) => u.username === userData.username)) {
      return false;
    }

    const newUser = {
      ...userData,
      id: Math.random().toString(36).substr(2, 9),
      password,
    };

    const updatedUsers = [...storedUsers, newUser];
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
