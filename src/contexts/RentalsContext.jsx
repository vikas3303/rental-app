import { createContext, useContext, useState } from "react";

const RentalsContext = createContext();

export const RentalsProvider = ({ children }) => {
  const [rentals, setRentals] = useState([
    // Start with empty array - rentals will be added through the form
    // You can add some sample completed rentals if you want to show rental history:
    /*
    {
      id: "r1",
      equipmentId: "eq1",
      customerName: "Previous Customer",
      startDate: "2025-05-15",
      endDate: "2025-05-25",
      status: "Completed",
    }
    */
  ]);

  const addRental = (newRental) => {
    const rentalWithId = {
      ...newRental,
      id: 'r' + Date.now()
    };
    setRentals(prev => [...prev, rentalWithId]);
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

  // Update rental status (Reserved -> Active -> Completed)
  const updateRentalStatus = (rentalId, newStatus) => {
    setRentals((prev) =>
      prev.map((rental) => 
        rental.id === rentalId ? { ...rental, status: newStatus } : rental
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