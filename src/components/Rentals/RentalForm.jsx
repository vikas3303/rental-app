import { useState } from "react";
import { useEquipment } from "../../contexts/EquipmentContext";
import { useRentals } from "../../contexts/RentalsContext"; // Use actual context

const RentalForm = () => {
  const { equipment } = useEquipment();
  const { addRental } = useRentals(); // Use real context instead of mock
  
  // Filter to show only available equipment
  const availableEquipment = equipment.filter(eq => eq.status === "Available");
  
  const [form, setForm] = useState({
    equipmentId: "",
    customerName: "",
    startDate: "",
    endDate: "",
    status: "Reserved",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.equipmentId) newErrors.equipmentId = "Equipment is required";
    if (!form.customerName.trim()) newErrors.customerName = "Customer name is required";
    if (!form.startDate) newErrors.startDate = "Start date is required";
    if (!form.endDate) newErrors.endDate = "End date is required";
    
    // Additional validation: end date should be after start date
    if (form.startDate && form.endDate && form.endDate <= form.startDate) {
      newErrors.endDate = "End date must be after start date";
    }
    
    // Validate start date is not in the past
    const today = new Date().toISOString().split('T')[0];
    if (form.startDate && form.startDate < today) {
      newErrors.startDate = "Start date cannot be in the past";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Calculate rental cost (optional - you can implement your pricing logic)
  const calculateCost = () => {
    if (!form.startDate || !form.endDate) return 0;
    
    const start = new Date(form.startDate);
    const end = new Date(form.endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    
    // Simple pricing: $100 per day (you can make this equipment-specific)
    return days * 100;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newRental = {
      ...form,
      customerId: `c${Date.now()}`, // Generate customer ID
      totalCost: calculateCost(), // Add total cost
      createdAt: new Date().toISOString(), // Add creation timestamp
    };
    
    addRental(newRental);
    
    // Reset form
    setForm({
      equipmentId: "",
      customerName: "",
      startDate: "",
      endDate: "",
      status: "Reserved",
    });
    setErrors({});
    
    alert(`Rental added successfully! Customer: ${newRental.customerName}`);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h2>Add New Rental</h2>

      <form onSubmit={handleSubmit}>
        {/* Equipment Dropdown */}
        <div style={{ marginBottom: "16px" }}>
          <label style={{ display: "block", marginBottom: "4px" }}>
            Equipment Name: <span style={{ color: "red" }}>*</span>
          </label>
          <select
            name="equipmentId"
            value={form.equipmentId}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              border: errors.equipmentId ? "2px solid red" : "1px solid #ccc",
              borderRadius: "4px",
            }}
          >
            <option value="">-- Select Equipment --</option>
            {availableEquipment.map((eq) => (
              <option key={eq.id} value={eq.id}>
                {eq.name} ({eq.category})
              </option>
            ))}
          </select>
          {errors.equipmentId && (
            <div style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
              {errors.equipmentId}
            </div>
          )}
        </div>

        {/* Customer Name Input */}
        <div style={{ marginBottom: "16px" }}>
          <label style={{ display: "block", marginBottom: "4px" }}>
            Customer Name: <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="customerName"
            value={form.customerName}
            onChange={handleChange}
            placeholder="Enter customer name"
            style={{
              width: "100%",
              padding: "8px",
              border: errors.customerName ? "2px solid red" : "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          {errors.customerName && (
            <div style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
              {errors.customerName}
            </div>
          )}
        </div>

        {/* Start Date */}
        <div style={{ marginBottom: "16px" }}>
          <label style={{ display: "block", marginBottom: "4px" }}>
            Start Date: <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]} // Prevent past dates
            style={{
              width: "100%",
              padding: "8px",
              border: errors.startDate ? "2px solid red" : "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          {errors.startDate && (
            <div style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
              {errors.startDate}
            </div>
          )}
        </div>

        {/* End Date */}
        <div style={{ marginBottom: "16px" }}>
          <label style={{ display: "block", marginBottom: "4px" }}>
            End Date: <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            min={form.startDate || new Date().toISOString().split('T')[0]} // Min date is start date
            style={{
              width: "100%",
              padding: "8px",
              border: errors.endDate ? "2px solid red" : "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          {errors.endDate && (
            <div style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
              {errors.endDate}
            </div>
          )}
        </div>

        {/* Estimated Cost Display */}
        {form.startDate && form.endDate && (
          <div style={{ marginBottom: "16px", padding: "10px", backgroundColor: "#f0f8ff", borderRadius: "4px" }}>
            <strong>Estimated Cost: ${calculateCost()}</strong>
            <div style={{ fontSize: "12px", color: "#666" }}>
              ({Math.ceil((new Date(form.endDate) - new Date(form.startDate)) / (1000 * 60 * 60 * 24))} days × $100/day)
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            marginTop: "16px",
            width: "100%",
            padding: "10px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add Rental
        </button>
      </form>
    </div>
  );
};

export default RentalForm;