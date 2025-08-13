import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { mockProperties } from '../../utils/mockData';
import PropertyCard from '../PropertyCard';
import { Property } from '../../types';

const PropertiesTab: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<Property['type'] | 'all'>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // Filter properties based on user role
  const userProperties = user?.role === 'owner' 
    ? mockProperties.filter(p => p.ownerId === user.id)
    : mockProperties.filter(p => p.assignedAgentId === user?.id);

  // Apply search and filter
  const filteredProperties = userProperties.filter(property => {
    const matchesSearch = property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || property.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleAddProperty = () => {
    setShowAddModal(true);
  };

  const handleEditProperty = (propertyId: string) => {
    console.log('Edit property:', propertyId);
    // Implement edit functionality
  };

  const handleAssignAgent = (propertyId: string) => {
    console.log('Assign agent to property:', propertyId);
    // Implement agent assignment functionality
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Properties</h1>
          <p className="text-gray-600">
            {user?.role === 'owner' ? 'Manage your properties' : 'Properties assigned to you'}
          </p>
        </div>
        {user?.role === 'owner' && (
          <button
            onClick={handleAddProperty}
            className="btn-primary"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Property
          </button>
        )}
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search properties..."
            className="input pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select
            className="input pl-10 pr-8"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as Property['type'] | 'all')}
          >
            <option value="all">All Types</option>
            <option value="farmhouse">Farmhouse</option>
            <option value="club">Club</option>
            <option value="banquet">Banquet</option>
            <option value="house_party">House Party</option>
          </select>
        </div>
      </div>

      {/* Properties Grid */}
      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onEdit={() => handleEditProperty(property.id)}
              onAssignAgent={user?.role === 'owner' ? () => handleAssignAgent(property.id) : undefined}
              showActions={true}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Plus className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm || filterType !== 'all' ? 'No properties found' : 'No properties yet'}
          </h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || filterType !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : user?.role === 'owner' 
                ? 'Get started by adding your first property'
                : 'No properties have been assigned to you yet'
            }
          </p>
          {user?.role === 'owner' && !searchTerm && filterType === 'all' && (
            <button
              onClick={handleAddProperty}
              className="btn-primary"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Property
            </button>
          )}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <div className="card text-center">
          <div className="text-2xl font-bold text-gray-900">{userProperties.length}</div>
          <div className="text-sm text-gray-600">Total Properties</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-success-600">
            {userProperties.filter(p => p.isActive).length}
          </div>
          <div className="text-sm text-gray-600">Active</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary-600">
            {userProperties.filter(p => p.assignedAgentId).length}
          </div>
          <div className="text-sm text-gray-600">With Agents</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-gray-900">
            ₹{userProperties.reduce((sum, p) => sum + p.pricePerHour, 0).toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Total Value/Hour</div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesTab;