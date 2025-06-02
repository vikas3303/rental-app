import React from 'react';
import KPICards from '../components/Dashboard/KPICards';
import Charts from '../components/Dashboard/Charts';
import { Link } from 'react-router-dom';
import NotificationCenter from '../components/Notifications/NotificationCenter';

function DashboardPage() {
  return (
    <div className="p-6 bg-gray-800 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {/* Notifications */}
      <NotificationCenter />

      {/* KPI Cards */}
      <KPICards />

      {/* Charts */}
      <Charts />

      {/* Navigation Links */}
      <nav className="mt-10">
        <ul className="space-y-2">
          <li>
            <Link to="/equipment" className="text-blue-600 hover:underline text-lg">
              ➤ Manage Equipment
            </Link>
          </li>
          <li>
            <Link to="/rentals" className="text-blue-600 hover:underline text-lg">
              ➤ Manage Rentals
            </Link>
          </li>
          <li>
            <Link to="/maintenance" className="text-blue-600 hover:underline text-lg">
              ➤ Manage Maintenance
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default DashboardPage;
