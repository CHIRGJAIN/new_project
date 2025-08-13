export interface User {
  id: string;
  email: string;
  name: string;
  role: 'owner' | 'agent';
  createdAt: string;
}

export interface Property {
  id: string;
  name: string;
  type: 'farmhouse' | 'club' | 'banquet' | 'houseparty';
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
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  clientName: string;
  clientContact: string;
  createdBy: string;
  createdAt: string;
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  assignedProperties: string[];
  createdBy: string;
  isActive: boolean;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}