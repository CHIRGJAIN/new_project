export interface User {
  id: string;
  email: string;
  name: string;
  role: 'owner' | 'agent';
  ownerId?: string; // For agents, references the owner who created them
  createdAt: string;
}

export interface Property {
  id: string;
  name: string;
  type: 'farmhouse' | 'club' | 'banquet' | 'house_party';
  description: string;
  location: string;
  capacity: number;
  pricePerHour: number;
  amenities: string[];
  images: string[];
  ownerId: string;
  assignedAgentId?: string;
  isActive: boolean;
  createdAt: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  propertyId: string;
  startDate: string;
  endDate: string;
  guestCount: number;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  createdBy: string; // User ID
  createdAt: string;
}

export interface FinancialRecord {
  id: string;
  eventId: string;
  propertyId: string;
  amount: number;
  type: 'booking' | 'commission' | 'expense';
  description: string;
  date: string;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}