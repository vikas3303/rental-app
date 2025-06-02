import React from 'react';

function KPICards() {
  const totalEquipment = 5;
  const activeRentals = 2;
  const upcomingMaintenance = 1;
  const availableEquipment = totalEquipment - activeRentals;

  return (
    <div className="p-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-400 rounded-2xl shadow-md p-6 text-center">
          <h3 className="text-gray-600 text-sm">Total Equipment</h3>
          <p className="text-2xl font-bold text-blue-600 mt-2">{totalEquipment}</p>
        </div>
        <div className="bg-gray-400 rounded-2xl shadow-md p-6 text-center">
          <h3 className="text-gray-600 text-sm">Active Rentals</h3>
          <p className="text-2xl font-bold text-green-600 mt-2">{activeRentals}</p>
        </div>
        <div className="bg-gray-400 rounded-2xl shadow-md p-6 text-center">
          <h3 className="text-gray-600 text-sm">Available Equipment</h3>
          <p className="text-2xl font-bold text-purple-600 mt-2">{availableEquipment}</p>
        </div>
        <div className="bg-gray-400 rounded-2xl shadow-md p-6 text-center">
          <h3 className="text-gray-600 text-sm">Upcoming Maintenance</h3>
          <p className="text-2xl font-bold text-red-600 mt-2">{upcomingMaintenance}</p>
        </div>
      </div>
    </div>
  );
}

export default KPICards;
