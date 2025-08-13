import React, { useState } from 'react';
import { Plus, Search, UserPlus, Mail, Phone, Calendar, Building2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { mockProperties } from '../../utils/mockData';

interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  assignedProperties: number;
  totalEvents: number;
  joinedDate: string;
  status: 'active' | 'inactive';
}

const AgentsTab: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Mock agents data - in real app, this would come from API
  const mockAgents: Agent[] = [
    {
      id: '2',
      name: 'Jane Agent',
      email: 'agent@example.com',
      phone: '+91-9876543210',
      assignedProperties: 2,
      totalEvents: 5,
      joinedDate: '2024-01-02T00:00:00Z',
      status: 'active'
    }
  ];

  const filteredAgents = mockAgents.filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddAgent = () => {
    setShowAddModal(true);
  };

  const handleEditAgent = (agentId: string) => {
    console.log('Edit agent:', agentId);
    // Implement edit functionality
  };

  const handleToggleStatus = (agentId: string) => {
    console.log('Toggle agent status:', agentId);
    // Implement status toggle functionality
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getAgentProperties = (agentId: string) => {
    return mockProperties.filter(p => p.assignedAgentId === agentId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Agents</h1>
          <p className="text-gray-600">Manage your property agents and their assignments</p>
        </div>
        <button
          onClick={handleAddAgent}
          className="btn-primary"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Agent
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <div className="text-2xl font-bold text-gray-900">{mockAgents.length}</div>
          <div className="text-sm text-gray-600">Total Agents</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-success-600">
            {mockAgents.filter(a => a.status === 'active').length}
          </div>
          <div className="text-sm text-gray-600">Active</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary-600">
            {mockAgents.reduce((sum, a) => sum + a.assignedProperties, 0)}
          </div>
          <div className="text-sm text-gray-600">Properties Assigned</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-gray-900">
            {mockAgents.reduce((sum, a) => sum + a.totalEvents, 0)}
          </div>
          <div className="text-sm text-gray-600">Total Events</div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search agents..."
          className="input pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Agents List */}
      {filteredAgents.length > 0 ? (
        <div className="space-y-4">
          {filteredAgents.map((agent) => {
            const agentProperties = getAgentProperties(agent.id);
            
            return (
              <div key={agent.id} className="card">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <UserPlus className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{agent.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-1" />
                          {agent.email}
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-1" />
                          {agent.phone}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          Joined {formatDate(agent.joinedDate)}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-1">
                        <span>{agent.assignedProperties} properties</span>
                        <span>•</span>
                        <span>{agent.totalEvents} events</span>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        agent.status === 'active' 
                          ? 'bg-success-100 text-success-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {agent.status}
                      </span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditAgent(agent.id)}
                        className="btn-secondary"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleToggleStatus(agent.id)}
                        className={agent.status === 'active' ? 'btn-warning' : 'btn-success'}
                      >
                        {agent.status === 'active' ? 'Deactivate' : 'Activate'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Assigned Properties */}
                {agentProperties.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Assigned Properties</h4>
                    <div className="flex flex-wrap gap-2">
                      {agentProperties.map((property) => (
                        <div
                          key={property.id}
                          className="flex items-center space-x-1 px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                        >
                          <Building2 className="w-3 h-3" />
                          <span>{property.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <UserPlus className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm ? 'No agents found' : 'No agents yet'}
          </h3>
          <p className="text-gray-600 mb-4">
            {searchTerm 
              ? 'Try adjusting your search criteria'
              : 'Get started by adding your first agent'
            }
          </p>
          {!searchTerm && (
            <button
              onClick={handleAddAgent}
              className="btn-primary"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Agent
            </button>
          )}
        </div>
      )}

      {/* Add Agent Modal Placeholder */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Agent</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" className="input" placeholder="Agent name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" className="input" placeholder="agent@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input type="tel" className="input" placeholder="+91-9876543210" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input type="password" className="input" placeholder="Create password" />
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Implement add agent functionality
                  setShowAddModal(false);
                }}
                className="btn-primary flex-1"
              >
                Add Agent
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentsTab;