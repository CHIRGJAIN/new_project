import React from 'react';
import { Calendar, Users, DollarSign, Phone, Mail, Clock } from 'lucide-react';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
  propertyName?: string;
  onEdit?: () => void;
  onUpdateStatus?: (status: Event['status']) => void;
  showActions?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ 
  event, 
  propertyName, 
  onEdit, 
  onUpdateStatus, 
  showActions = true 
}) => {
  const getStatusColor = (status: Event['status']) => {
    switch (status) {
      case 'confirmed':
        return 'bg-success-100 text-success-800';
      case 'pending':
        return 'bg-warning-100 text-warning-800';
      case 'cancelled':
        return 'bg-error-100 text-error-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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

  const getDuration = () => {
    const start = new Date(event.startDate);
    const end = new Date(event.endDate);
    const hours = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60));
    return `${hours} hour${hours > 1 ? 's' : ''}`;
  };

  return (
    <div className="card hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {event.title}
          </h3>
          {propertyName && (
            <p className="text-sm text-gray-600 mb-2">{propertyName}</p>
          )}
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
          </span>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4">
        {event.description}
      </p>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          {formatDate(event.startDate)}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="w-4 h-4 mr-2" />
          Duration: {getDuration()}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Users className="w-4 h-4 mr-2" />
          {event.guestCount} guests
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <DollarSign className="w-4 h-4 mr-2" />
          ₹{event.totalAmount.toLocaleString()}
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-3 mb-4">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Client Details</h4>
        <div className="space-y-1">
          <p className="text-sm text-gray-600">{event.clientName}</p>
          <div className="flex items-center text-sm text-gray-600">
            <Mail className="w-3 h-3 mr-1" />
            {event.clientEmail}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Phone className="w-3 h-3 mr-1" />
            {event.clientPhone}
          </div>
        </div>
      </div>

      {showActions && (
        <div className="space-y-2 pt-4 border-t border-gray-200">
          {onEdit && (
            <button
              onClick={onEdit}
              className="btn-secondary w-full"
            >
              Edit Event
            </button>
          )}
          {onUpdateStatus && event.status === 'pending' && (
            <div className="flex space-x-2">
              <button
                onClick={() => onUpdateStatus('confirmed')}
                className="btn-success flex-1"
              >
                Confirm
              </button>
              <button
                onClick={() => onUpdateStatus('cancelled')}
                className="btn-error flex-1"
              >
                Cancel
              </button>
            </div>
          )}
          {onUpdateStatus && event.status === 'confirmed' && (
            <button
              onClick={() => onUpdateStatus('completed')}
              className="btn-primary w-full"
            >
              Mark Complete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default EventCard;