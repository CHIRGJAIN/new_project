import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Layout from './Layout';
import PropertiesTab from './tabs/PropertiesTab';
import EventsTab from './tabs/EventsTab';
import FinancesTab from './tabs/FinancesTab';
import AgentsTab from './tabs/AgentsTab';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('properties');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'properties':
        return <PropertiesTab />;
      case 'events':
        return <EventsTab />;
      case 'finances':
        return user?.role === 'owner' ? <FinancesTab /> : null;
      case 'agents':
        return user?.role === 'owner' ? <AgentsTab /> : null;
      default:
        return <PropertiesTab />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderTabContent()}
    </Layout>
  );
};

export default Dashboard;