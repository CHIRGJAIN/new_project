import { Property, Event, FinancialRecord } from '../types';

export const mockProperties: Property[] = [
  {
    id: '1',
    name: 'Sunset Farmhouse',
    type: 'farmhouse',
    description: 'Beautiful farmhouse with scenic views and modern amenities',
    location: 'Gurgaon, Haryana',
    capacity: 50,
    pricePerHour: 5000,
    amenities: ['Swimming Pool', 'BBQ Area', 'Garden', 'Parking'],
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
    description: 'Premium club with all modern facilities',
    location: 'Delhi, India',
    capacity: 100,
    pricePerHour: 8000,
    amenities: ['Bar', 'Dance Floor', 'VIP Rooms', 'Valet Parking'],
    images: ['https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg'],
    ownerId: '1',
    isActive: true,
    createdAt: '2024-01-02T00:00:00Z'
  },
  {
    id: '3',
    name: 'Grand Banquet Hall',
    type: 'banquet',
    description: 'Spacious banquet hall perfect for weddings and corporate events',
    location: 'Noida, UP',
    capacity: 200,
    pricePerHour: 12000,
    amenities: ['Stage', 'Sound System', 'Catering Kitchen', 'AC'],
    images: ['https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg'],
    ownerId: '1',
    assignedAgentId: '2',
    isActive: true,
    createdAt: '2024-01-03T00:00:00Z'
  }
];

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Birthday Celebration',
    description: 'Private birthday party for 30 guests',
    propertyId: '1',
    startDate: '2024-02-15T18:00:00Z',
    endDate: '2024-02-15T23:00:00Z',
    guestCount: 30,
    totalAmount: 25000,
    status: 'confirmed',
    clientName: 'Rahul Sharma',
    clientEmail: 'rahul@example.com',
    clientPhone: '+91-9876543210',
    createdBy: '2',
    createdAt: '2024-02-01T00:00:00Z'
  },
  {
    id: '2',
    title: 'Corporate Meeting',
    description: 'Annual company meeting and team building',
    propertyId: '2',
    startDate: '2024-02-20T09:00:00Z',
    endDate: '2024-02-20T17:00:00Z',
    guestCount: 80,
    totalAmount: 64000,
    status: 'pending',
    clientName: 'Tech Solutions Ltd',
    clientEmail: 'events@techsolutions.com',
    clientPhone: '+91-9876543211',
    createdBy: '1',
    createdAt: '2024-02-05T00:00:00Z'
  }
];

export const mockFinancials: FinancialRecord[] = [
  {
    id: '1',
    eventId: '1',
    propertyId: '1',
    amount: 25000,
    type: 'booking',
    description: 'Birthday Celebration booking payment',
    date: '2024-02-15T00:00:00Z',
    createdAt: '2024-02-01T00:00:00Z'
  },
  {
    id: '2',
    eventId: '1',
    propertyId: '1',
    amount: 2500,
    type: 'commission',
    description: 'Agent commission (10%)',
    date: '2024-02-15T00:00:00Z',
    createdAt: '2024-02-01T00:00:00Z'
  }
];