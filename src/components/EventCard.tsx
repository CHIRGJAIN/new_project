import React from 'react';
import { Event, Property } from '../types';
import { Calendar, Users, DollarSign, Phone, User } from 'lucide-react';

interface EventCardProps {
  event: Event;
  property?: Property;
  onEdit?: () => void;
  showActions?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ 
  event, 
  property, 
  onEdit, 
  showActions = false 
}) => {
  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      completed: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="card hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(event.status)}`}>
            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
          </span>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-green-600">
            ₹{event.totalAmount.toLocaleString()}
          </div>
        </div>
      </div>

      {property && (
        <div className="mb-3">
          <span className="text-sm text-gray-500">Property: </span>
          <span className="text-sm font-medium text-gray-700">{property.name}</span>
        </div>
      )}

      <p className="text-gray-600 text-sm mb-4">{event.description}</p>

      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(event.startDate)} - {formatDate(event.endDate)}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Users className="w-4 h-4" />
          <span>{event.guestCount} guests</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <User className="w-4 h-4" />
          <span>{event.clientName}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Phone className="w-4 h-4" />
          <span>{event.clientContact}</span>
        </div>
      </div>

      {showActions && (
        <div className="flex space-x-2">
          <button onClick={onEdit} className="btn-secondary flex-1">
            Edit Event
          </button>
          {event.status === 'pending' && (
            <button className="btn-primary flex-1">
              Confirm
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default EventCard;