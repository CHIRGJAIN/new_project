import React from 'react';
import { MapPin, Users, DollarSign, Star, UserCheck } from 'lucide-react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  onEdit?: () => void;
  onAssignAgent?: () => void;
  showActions?: boolean;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ 
  property, 
  onEdit, 
  onAssignAgent, 
  showActions = true 
}) => {
  const getPropertyTypeColor = (type: Property['type']) => {
    switch (type) {
      case 'farmhouse':
        return 'bg-green-100 text-green-800';
      case 'club':
        return 'bg-purple-100 text-purple-800';
      case 'banquet':
        return 'bg-blue-100 text-blue-800';
      case 'house_party':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatPropertyType = (type: Property['type']) => {
    return type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="card hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {property.name}
          </h3>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPropertyTypeColor(property.type)}`}>
            {formatPropertyType(property.type)}
          </span>
        </div>
        <div className={`w-3 h-3 rounded-full ${property.isActive ? 'bg-success-500' : 'bg-gray-400'}`} />
      </div>

      {property.images.length > 0 && (
        <div className="mb-4">
          <img
            src={property.images[0]}
            alt={property.name}
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
      )}

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {property.description}
      </p>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          {property.location}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Users className="w-4 h-4 mr-2" />
          Capacity: {property.capacity} guests
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <DollarSign className="w-4 h-4 mr-2" />
          ₹{property.pricePerHour.toLocaleString()}/hour
        </div>
        {property.assignedAgentId && (
          <div className="flex items-center text-sm text-success-600">
            <UserCheck className="w-4 h-4 mr-2" />
            Agent Assigned
          </div>
        )}
      </div>

      {property.amenities.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {property.amenities.slice(0, 3).map((amenity, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800"
              >
                {amenity}
              </span>
            ))}
            {property.amenities.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                +{property.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {showActions && (
        <div className="flex space-x-2 pt-4 border-t border-gray-200">
          {onEdit && (
            <button
              onClick={onEdit}
              className="btn-secondary flex-1"
            >
              Edit
            </button>
          )}
          {onAssignAgent && !property.assignedAgentId && (
            <button
              onClick={onAssignAgent}
              className="btn-primary flex-1"
            >
              Assign Agent
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default PropertyCard;