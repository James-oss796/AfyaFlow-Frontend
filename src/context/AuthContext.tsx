import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNotification } from './NotificationContext';

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
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_STORAGE_KEY = 'afyaflow_users';
const SESSION_STORAGE_KEY = 'afyaflow_session';

const DEFAULT_USERS = [
  {
    id: '1',
    username: 'admin',
    passwordHash: btoa('admin123'),
    fullName: 'System Admin',
    role: 'Admin' as Role,
  },
  {
    id: '2',
    username: 'doctor',
    passwordHash: btoa('doctor123'),
    fullName: 'Dr. Anthony Maina',
    role: 'Doctor' as Role,
    departmentId: 'Cardiology',
  },
  {
    id: '3',
    username: 'receptionist',
    passwordHash: btoa('reception123'),
    fullName: 'Jane Kamau',
    role: 'Receptionist' as Role,
  },
];

const hashPassword = (password: string): string => btoa(password);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { notify } = useNotification();

  useEffect(() => {
    const initAuth = async () => {
      const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
      if (!storedUsers) {
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_USERS));
      }

      const session = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (session) {
        try {
          setUser(JSON.parse(session));
        } catch {
          sessionStorage.removeItem(SESSION_STORAGE_KEY);
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = useCallback(async (username: string, password: string): Promise<boolean> => {
    setError(null);
    setLoading(true);
    try {
      await new Promise(r => setTimeout(r, 800)); // Simulate network
      const storedUsers = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
      const passwordHash = hashPassword(password);
      const foundUser = storedUsers.find(
        (u: any) => u.username === username && u.passwordHash === passwordHash
      );

      if (foundUser) {
        const { passwordHash: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(userWithoutPassword));
        notify(`Welcome back, ${userWithoutPassword.fullName}!`, 'success', 'Login Successful');
        setLoading(false);
        return true;
      }
      setError('Invalid username or password');
      notify('Invalid username or password.', 'error', 'Login Failed');
      setLoading(false);
      return false;
    } catch {
      setError('An error occurred during login');
      notify('An error occurred during login. Please try again.', 'error', 'Error');
      setLoading(false);
      return false;
    }
  }, [notify]);

  const logout = useCallback(() => {
    setUser(null);
    setError(null);
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
    notify('You have been securely signed out.', 'info', 'Signed Out');
  }, [notify]);

  const register = useCallback(async (userData: Omit<User, 'id'>, password: string): Promise<boolean> => {
    setError(null);
    try {
      const storedUsers = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');

      if (storedUsers.some((u: { username: string }) => u.username === userData.username)) {
        setError('Username already exists');
        notify('Username already exists. Please choose another one.', 'error', 'Registration Failed');
        return false;
      }

      if (!password || password.length < 4) {
        setError('Password must be at least 4 characters');
        notify('Password must be at least 4 characters.', 'error', 'Registration Failed');
        return false;
      }

      const newUser = {
        ...userData,
        id: Math.random().toString(36).substr(2, 9),
        passwordHash: hashPassword(password),
      };

      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify([...storedUsers, newUser]));
      notify(`Account created for ${userData.fullName}.`, 'success', 'Staff Registered');
      return true;
    } catch {
      setError('An error occurred during registration');
      notify('An error occurred during registration. Please try again.', 'error', 'Error');
      return false;
    }
  }, [notify]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, register, loading, error }}>
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
