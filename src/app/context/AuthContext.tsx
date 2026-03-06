import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'resident' | 'gate' | 'manager' | 'maintenance';

export interface User {
  id: string;
  name: string;
  cpf: string;
  role: UserRole;
  apartment?: string;
}

interface AuthContextType {
  user: User | null;
  login: (cpf: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users para demonstração
const mockUsers: Record<string, { password: string; user: User }> = {
  '111.111.111-11': {
    password: '123456',
    user: {
      id: '1',
      name: 'João Silva',
      cpf: '111.111.111-11',
      role: 'resident',
      apartment: '101'
    }
  },
  '222.222.222-22': {
    password: '123456',
    user: {
      id: '2',
      name: 'Carlos Oliveira',
      cpf: '222.222.222-22',
      role: 'manager'
    }
  },
  '333.333.333-33': {
    password: '123456',
    user: {
      id: '3',
      name: 'Pedro Souza',
      cpf: '333.333.333-33',
      role: 'gate'
    }
  },
  '444.444.444-44': {
    password: '123456',
    user: {
      id: '4',
      name: 'Ana Costa',
      cpf: '444.444.444-44',
      role: 'maintenance'
    }
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (cpf: string, password: string): boolean => {
    const userData = mockUsers[cpf];
    if (userData && userData.password === password) {
      setUser(userData.user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}