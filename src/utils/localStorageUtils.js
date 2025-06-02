const initMockData = () => {
  if (!localStorage.getItem('users')) {
    const data = {
      users: [
        { id: "1", role: "Admin", email: "admin@entnt.in", password: "admin123" },
        { id: "2", role: "Staff", email: "staff@entnt.in", password: "staff123" },
        { id: "3", role: "Customer", email: "customer@entnt.in", password: "cust123" }
      ],
      equipment: [
        { id: "eq1", name: "Excavator", category: "Heavy Machinery", condition: "Good", status: "Available" },
        { id: "eq2", name: "Concrete Mixer", category: "Construction", condition: "Excellent", status: "Rented" }
      ],
      rentals: [
        { id: "r1", equipmentId: "eq2", customerId: "3", startDate: "2025-06-01", endDate: "2025-06-05", status: "Reserved" }
      ],
      maintenance: [
        { id: "m1", equipmentId: "eq1", date: "2025-05-20", type: "Routine Check", notes: "No issues found" }
      ]
    };
    Object.keys(data).forEach(key => localStorage.setItem(key, JSON.stringify(data[key])));
  }
};

export { initMockData };
