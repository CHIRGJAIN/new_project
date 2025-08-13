import React, { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Calendar, Download } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { mockFinancials, mockEvents, mockProperties } from '../../utils/mockData';

const FinancesTab: React.FC = () => {
  const { user } = useAuth();
  const [dateRange, setDateRange] = useState('month');

  // Filter financial records for owner's properties
  const userFinancials = mockFinancials.filter(record => {
    const property = mockProperties.find(p => p.id === record.propertyId);
    return property?.ownerId === user?.id;
  });

  const calculateStats = () => {
    const totalRevenue = userFinancials
      .filter(r => r.type === 'booking')
      .reduce((sum, r) => sum + r.amount, 0);
    
    const totalCommissions = userFinancials
      .filter(r => r.type === 'commission')
      .reduce((sum, r) => sum + r.amount, 0);
    
    const totalExpenses = userFinancials
      .filter(r => r.type === 'expense')
      .reduce((sum, r) => sum + r.amount, 0);
    
    const netProfit = totalRevenue - totalCommissions - totalExpenses;

    return {
      totalRevenue,
      totalCommissions,
      totalExpenses,
      netProfit
    };
  };

  const stats = calculateStats();

  const getPropertyName = (propertyId: string) => {
    const property = mockProperties.find(p => p.id === propertyId);
    return property?.name || 'Unknown Property';
  };

  const getEventTitle = (eventId: string) => {
    const event = mockEvents.find(e => e.id === eventId);
    return event?.title || 'Unknown Event';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'booking':
        return 'text-success-600 bg-success-50';
      case 'commission':
        return 'text-warning-600 bg-warning-50';
      case 'expense':
        return 'text-error-600 bg-error-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return <TrendingUp className="w-4 h-4" />;
      case 'commission':
        return <TrendingDown className="w-4 h-4" />;
      case 'expense':
        return <TrendingDown className="w-4 h-4" />;
      default:
        return <DollarSign className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Finances</h1>
          <p className="text-gray-600">Track your revenue, expenses, and profits</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            className="input"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <button className="btn-secondary">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Financial Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-success-600">
                ₹{stats.totalRevenue.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-success-100 rounded-full">
              <TrendingUp className="w-6 h-6 text-success-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Commissions Paid</p>
              <p className="text-2xl font-bold text-warning-600">
                ₹{stats.totalCommissions.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-warning-100 rounded-full">
              <TrendingDown className="w-6 h-6 text-warning-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Expenses</p>
              <p className="text-2xl font-bold text-error-600">
                ₹{stats.totalExpenses.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-error-100 rounded-full">
              <TrendingDown className="w-6 h-6 text-error-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Net Profit</p>
              <p className={`text-2xl font-bold ${stats.netProfit >= 0 ? 'text-success-600' : 'text-error-600'}`}>
                ₹{stats.netProfit.toLocaleString()}
              </p>
            </div>
            <div className={`p-3 rounded-full ${stats.netProfit >= 0 ? 'bg-success-100' : 'bg-error-100'}`}>
              <DollarSign className={`w-6 h-6 ${stats.netProfit >= 0 ? 'text-success-600' : 'text-error-600'}`} />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
          <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            View All
          </button>
        </div>

        <div className="space-y-4">
          {userFinancials.length > 0 ? (
            userFinancials.slice(0, 10).map((record) => (
              <div key={record.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-full ${getTypeColor(record.type)}`}>
                    {getTypeIcon(record.type)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{record.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{getPropertyName(record.propertyId)}</span>
                      <span>•</span>
                      <span>{getEventTitle(record.eventId)}</span>
                      <span>•</span>
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {formatDate(record.date)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    record.type === 'booking' ? 'text-success-600' : 'text-error-600'
                  }`}>
                    {record.type === 'booking' ? '+' : '-'}₹{record.amount.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">{record.type}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions yet</h3>
              <p className="text-gray-600">Financial records will appear here once you start booking events</p>
            </div>
          )}
        </div>
      </div>

      {/* Property Performance */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Property Performance</h2>
        <div className="space-y-4">
          {mockProperties
            .filter(p => p.ownerId === user?.id)
            .map((property) => {
              const propertyRevenue = userFinancials
                .filter(r => r.propertyId === property.id && r.type === 'booking')
                .reduce((sum, r) => sum + r.amount, 0);
              
              const propertyEvents = mockEvents.filter(e => e.propertyId === property.id).length;
              
              return (
                <div key={property.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{property.name}</p>
                    <p className="text-sm text-gray-600">{property.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">₹{propertyRevenue.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">{propertyEvents} events</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default FinancesTab;