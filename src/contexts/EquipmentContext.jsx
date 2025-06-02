import { createContext, useContext, useState } from "react";

const EquipmentContext = createContext();

export const EquipmentProvider = ({ children }) => {
  const [equipment, setEquipment] = useState([
    {
      id: "eq1",
      name: "Excavator",
      category: "Heavy Machinery",
      condition: "Good",
      status: "Available",
    },
    {
      id: "eq2",
      name: "Concrete Mixer",
      category: "Construction",
      condition: "Excellent",
      status: "Rented",
    },
    {
      id: "eq3",
      name: "Bulldozer",
      category: "Heavy Machinery",
      condition: "Good",
      status: "Available",
    },
    {
      id: "eq4",
      name: "Crane",
      category: "Heavy Machinery",
      condition: "Excellent",
      status: "Available",
    },
    {
      id: "eq5",
      name: "Loader",
      category: "Heavy Machinery",
      condition: "Good",
      status: "Available",
    },
    {
      id: "eq6",
      name: "Grader",
      category: "Heavy Machinery",
      condition: "Fair",
      status: "Available",
    },
    {
      id: "eq7",
      name: "Forklift",
      category: "Material Handling",
      condition: "Excellent",
      status: "Available",
    },
    {
      id: "eq8",
      name: "Backhoe",
      category: "Heavy Machinery",
      condition: "Good",
      status: "Rented",
    },
    {
      id: "eq9",
      name: "Skid-Steer Loader",
      category: "Compact Equipment",
      condition: "Good",
      status: "Available",
    },
    {
      id: "eq10",
      name: "Dump Truck",
      category: "Transportation",
      condition: "Fair",
      status: "Available",
    },
    {
      id: "eq11",
      name: "Trencher",
      category: "Specialty Equipment",
      condition: "Good",
      status: "Available",
    },
    {
      id: "eq12",
      name: "Compactor",
      category: "Compaction Equipment",
      condition: "Excellent",
      status: "Available",
    },
  ]);

  const addEquipment = (newEquipment) => {
    const equipmentWithId = {
      ...newEquipment,
      id: 'eq' + Date.now()
    };
    setEquipment(prev => [...prev, equipmentWithId]);
  };

  const editEquipment = (updatedItem) => {
    setEquipment((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  // Add delete functionality
  const deleteEquipment = (id) => {
    setEquipment((prev) => prev.filter((item) => item.id !== id));
  };

  // Update equipment status (useful for rentals)
  const updateEquipmentStatus = (equipmentId, newStatus) => {
    setEquipment((prev) =>
      prev.map((item) => 
        item.id === equipmentId ? { ...item, status: newStatus } : item
      )
    );
  };

  return (
    <EquipmentContext.Provider
      value={{ 
        equipment,
        setEquipment,
        editEquipment,
        addEquipment,
        deleteEquipment,
        updateEquipmentStatus
      }}>
      {children}
    </EquipmentContext.Provider>
  );
};

export const useEquipment = () => useContext(EquipmentContext);