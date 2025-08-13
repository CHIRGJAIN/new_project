import { User, Property, Event, Agent } from '../types';

// Mock users for demo
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'owner@example.com',
    name: 'John Owner',
    role: 'owner',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    email: 'agent@example.com',
    name: 'Jane Agent',
    role: 'agent',
    createdAt: '2024-01-01T00:00:00Z'
  }
];

export const mockProperties: Property[] = [
  {
    id: '1',
    name: 'Sunset Farmhouse',
    type: 'farmhouse',
    description: 'Beautiful farmhouse with scenic views perfect for events',
    location: 'Gurgaon, Haryana',
    capacity: 100,
    pricePerHour: 5000,
    amenities: ['Swimming Pool', 'Garden', 'BBQ Area', 'Parking'],
    images: ['https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg'],
    ownerId: '1',
    assignedAgentId: '2',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Elite Club House',
    type: 'club',
    description: 'Premium club house for corporate events and parties',
    location: 'Delhi NCR',
    capacity: 200,
    pricePerHour: 8000,
    amenities: ['Bar', 'Dance Floor', 'Sound System', 'Catering'],
    images: ['https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg'],
    ownerId: '1',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  }
];

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Birthday Celebration',
    description: 'Private birthday party for 50 guests',
    propertyId: '1',
    startDate: '2024-02-15T18:00:00Z',
    endDate: '2024-02-15T23:00:00Z',
    guestCount: 50,
    totalAmount: 25000,
    status: 'confirmed',
    clientName: 'Rahul Sharma',
    clientContact: '+91 9876543210',
    createdBy: '2',
    createdAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '2',
    title: 'Corporate Meeting',
    description: 'Annual company meeting and dinner',
    propertyId: '2',
    startDate: '2024-02-20T14:00:00Z',
    endDate: '2024-02-20T22:00:00Z',
    guestCount: 80,
    totalAmount: 64000,
    status: 'pending',
    clientName: 'Tech Solutions Ltd',
    clientContact: '+91 9876543211',
    createdBy: '2',
    createdAt: '2024-01-20T00:00:00Z'
  }
];

export const mockAgents: Agent[] = [
  {
    id: '2',
    name: 'Jane Agent',
    email: 'agent@example.com',
    phone: '+91 9876543210',
    assignedProperties: ['1'],
    createdBy: '1',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  }
];