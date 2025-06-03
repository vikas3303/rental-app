import { createContext, useContext, useState } from "react";

const RentalsContext = createContext();

export const RentalsProvider = ({ children }) => {
  const [rentals, setRentals] = useState([
    // Sample data for testing - remove this in production
    {
      id: "r1",
      equipmentId: "e1",
      customerId: "c1", // Changed from customerName to customerId
      customerName: "ABC Construction", // Keep customerName for display
      startDate: "2025-06-01",
      endDate: "2025-06-05",
      status: "Reserved",
      totalCost: 500
    }
  ]);

  const addRental = (newRental) => {
    const rentalWithId = {
      ...newRental,
      id: 'r' + Date.now(),
      // Generate customerId if not provided
      customerId: newRental.customerId || 'c' + Date.now()
    };
    setRentals(prev => [...prev, rentalWithId]);
    console.log("Rental added to context:", rentalWithId);
  };

  const editRental = (updatedRental) => {
    setRentals((prev) =>
      prev.map((rental) =>
        rental.id === updatedRental.id ? updatedRental : rental
      )
    );
  };

  const deleteRental = (id) => {
    setRentals((prev) => prev.filter((rental) => rental.id !== id));
  };

  // Fixed function name (was RentalStatus)
  const updateRentalStatus = (rentalId, newStatus) => {
    setRentals((prev) =>
      prev.map((rental) =>
        rental.id === rentalId ? { ...rental, status: newStatus } : rental
      )
    );
  };

  // Update rental function for RentalList
  const updateRental = (rentalId, updates) => {
    setRentals((prev) =>
      prev.map((rental) =>
        rental.id === rentalId ? { ...rental, ...updates } : rental
      )
    );
  };

  // Get rentals by status
  const getRentalsByStatus = (status) => {
    return rentals.filter(rental => rental.status === status);
  };

  // Get rentals by equipment ID
  const getRentalsByEquipment = (equipmentId) => {
    return rentals.filter(rental => rental.equipmentId === equipmentId);
  };

  // Get active rentals (for dashboard)
  const getActiveRentals = () => {
    return rentals.filter(rental => rental.status === "Active");
  };

  // Get overdue rentals (end date passed but still active)
  const getOverdueRentals = () => {
    const today = new Date().toISOString().split('T')[0];
    return rentals.filter(rental =>
      rental.status === "Active" && rental.endDate < today
    );
  };

  return (
    <RentalsContext.Provider
      value={{
        rentals,
        setRentals,
        addRental,
        editRental,
        deleteRental,
        updateRental, // Added this for RentalList
        updateRentalStatus,
        getRentalsByStatus,
        getRentalsByEquipment,
        getActiveRentals,
        getOverdueRentals
      }}>
      {children}
    </RentalsContext.Provider>
  );
};

export const useRentals = () => useContext(RentalsContext);