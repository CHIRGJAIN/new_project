import React from 'react';
import { Property } from '../types';
import { MapPin, Users, DollarSign, Star } from 'lucide-react';

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
  showActions = false 
}) => {
  const getPropertyTypeColor = (type: string) => {
    const colors = {
      farmhouse: 'bg-green-100 text-green-800',
      club: 'bg-purple-100 text-purple-800',
      banquet: 'bg-blue-100 text-blue-800',
      houseparty: 'bg-orange-100 text-orange-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="card hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{property.name}</h3>
          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getPropertyTypeColor(property.type)}`}>
            {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm text-gray-600">4.8</span>
        </div>
      </div>

      <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.name}
          className="w-full h-full object-cover"
        />
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{property.description}</p>

      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{property.location}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Users className="w-4 h-4" />
          <span>Up to {property.capacity} guests</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <DollarSign className="w-4 h-4" />
          <span>₹{property.pricePerHour.toLocaleString()}/hour</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mb-4">
        {property.amenities.slice(0, 3).map((amenity, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
          >
            {amenity}
          </span>
        ))}
        {property.amenities.length > 3 && (
          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
            +{property.amenities.length - 3} more
          </span>
        )}
      </div>

      {showActions && (
        <div className="flex space-x-2">
          <button onClick={onEdit} className="btn-secondary flex-1">
            Edit
          </button>
          <button onClick={onAssignAgent} className="btn-primary flex-1">
            Assign Agent
          </button>
        </div>
      )}
    </div>
  );
};

export default PropertyCard;