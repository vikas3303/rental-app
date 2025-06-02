import EquipmentList from '../components/Equipment/EquipmentList';
import { useState } from 'react';import React from 'react';
import EquipmentForm from '../components/Equipment/EquipmentForm';
import { EquipmentProvider } from '../contexts/EquipmentContext';

const EquipmentPage = () => {
  const [editingEquipment, setEditingEquipment] = useState(null);

  return (
    <EquipmentProvider>
      <div className="min-h-screen bg-gray-600">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Equipment Inventory Management
            </h1>
            <p className="text-lg text-gray-600">
              Manage your equipment inventory with ease
            </p>
          </div>

          <EquipmentForm 
            editingEquipment={editingEquipment} 
            setEditingEquipment={setEditingEquipment} 
          />
          
          <EquipmentList setEditingEquipment={setEditingEquipment} />
        </div>
      </div>
    </EquipmentProvider>
  );
};

export default EquipmentPage;

// export default EquipmentPage;
