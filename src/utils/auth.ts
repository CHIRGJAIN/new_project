import { User } from '../types';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export const tokenManager = {
  setToken: (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
  },
  
  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  },
  
  removeToken: () => {
    localStorage.removeItem(TOKEN_KEY);
  },
  
  setUser: (user: User) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  
  getUser: (): User | null => {
    const userStr = localStorage.getItem(USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  },
  
  removeUser: () => {
    localStorage.removeItem(USER_KEY);
  },
  
  clearAll: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
  
  isAuthenticated: (): boolean => {
    const token = localStorage.getItem(TOKEN_KEY);
    const user = localStorage.getItem(USER_KEY);
    return !!(token && user);
  }
};

// Mock authentication function
export const authenticateUser = async (email: string, password: string): Promise<{ user: User; token: string } | null> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock users for demo
  const mockUsers: Array<User & { password: string }> = [
    {
      id: '1',
      email: 'owner@example.com',
      password: 'owner123',
      name: 'John Owner',
      role: 'owner',
      createdAt: '2024-01-01T00:00:00Z'
    },
    {
      id: '2',
      email: 'agent@example.com',
      password: 'agent123',
      name: 'Jane Agent',
      role: 'agent',
      ownerId: '1',
      createdAt: '2024-01-02T00:00:00Z'
    }
  ];
  
  const user = mockUsers.find(u => u.email === email && u.password === password);
  
  if (user) {
    const { password: _, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      token: `mock_token_${user.id}_${Date.now()}`
    };
  }
  
  return null;
};