import React, { useState } from 'react';
import { Plus, Search, Filter, Calendar } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { mockEvents, mockProperties } from '../../utils/mockData';
import EventCard from '../EventCard';
import { Event } from '../../types';

const EventsTab: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<Event['status'] | 'all'>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // Filter events based on user role
  const userEvents = user?.role === 'owner' 
    ? mockEvents.filter(event => {
        const property = mockProperties.find(p => p.id === event.propertyId);
        return property?.ownerId === user.id;
      })
    : mockEvents.filter(event => event.createdBy === user?.id);

  // Apply search and filter
  const filteredEvents = userEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || event.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleAddEvent = () => {
    setShowAddModal(true);
  };

  const handleEditEvent = (eventId: string) => {
    console.log('Edit event:', eventId);
    // Implement edit functionality
  };

  const handleUpdateStatus = (eventId: string, status: Event['status']) => {
    console.log('Update event status:', eventId, status);
    // Implement status update functionality
  };

  const getPropertyName = (propertyId: string) => {
    const property = mockProperties.find(p => p.id === propertyId);
    return property?.name || 'Unknown Property';
  };

  const getStatusStats = () => {
    return {
      total: userEvents.length,
      pending: userEvents.filter(e => e.status === 'pending').length,
      confirmed: userEvents.filter(e => e.status === 'confirmed').length,
      completed: userEvents.filter(e => e.status === 'completed').length,
      cancelled: userEvents.filter(e => e.status === 'cancelled').length,
    };
  };

  const stats = getStatusStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Events</h1>
          <p className="text-gray-600">
            {user?.role === 'owner' ? 'Manage all property events' : 'Events you\'ve created'}
          </p>
        </div>
        <button
          onClick={handleAddEvent}
          className="btn-primary"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Event
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="card text-center">
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-sm text-gray-600">Total Events</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-warning-600">{stats.pending}</div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-success-600">{stats.confirmed}</div>
          <div className="text-sm text-gray-600">Confirmed</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.completed}</div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-error-600">{stats.cancelled}</div>
          <div className="text-sm text-gray-600">Cancelled</div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search events..."
            className="input pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select
            className="input pl-10 pr-8"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as Event['status'] | 'all')}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Events Grid */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              propertyName={getPropertyName(event.propertyId)}
              onEdit={() => handleEditEvent(event.id)}
              onUpdateStatus={(status) => handleUpdateStatus(event.id, status)}
              showActions={true}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Calendar className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm || filterStatus !== 'all' ? 'No events found' : 'No events yet'}
          </h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || filterStatus !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'Get started by creating your first event'
            }
          </p>
          {!searchTerm && filterStatus === 'all' && (
            <button
              onClick={handleAddEvent}
              className="btn-primary"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Event
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default EventsTab;