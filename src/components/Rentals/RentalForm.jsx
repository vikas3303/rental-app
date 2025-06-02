import { useState } from "react";
import { useEquipment } from "../../contexts/EquipmentContext";

const equipmentList = [
  { id: "e1", name: "Excavator" },
  { id: "e2", name: "Bulldozer" },
  { id: "e3", name: "Crane" },
  { id: "e4", name: "Loader" },
  { id: "e5", name: "Grader" },
  { id: "e6", name: "Forklift" },
  { id: "e7", name: "Backhoe" },
  { id: "e8", name: "Skid-Steer Loader" },
  { id: "e9", name: "Dump Truck" },
  { id: "e10", name: "Concrete Mixer" },
  { id: "e11", name: "Trencher" },
  { id: "e12", name: "Compactor" },
];
const useRentals = () => ({
  addRental: (rental) => {
    console.log("Added to rentals:", rental);
    alert(`Rental added to system! Customer: ${rental.customerName}`);
  }
});

const RentalForm = () => {
  const { equipment } = useEquipment();
  const { addRental } = useRentals();
  
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
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newRental = {
      ...form,
      id: `r${Date.now()}`,
    };
    addRental(newRental);
    setForm({
      equipmentId: "",
      customerName: "",
      startDate: "",
      endDate: "",
      status: "Reserved",
    });
    setErrors({});
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h2>Add New Rental</h2>

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
          <div style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>{errors.equipmentId}</div>
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
          <div style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>{errors.customerName}</div>
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
          style={{
            width: "100%",
            padding: "8px",
            border: errors.startDate ? "2px solid red" : "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        {errors.startDate && (
          <div style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>{errors.startDate}</div>
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
          style={{
            width: "100%",
            padding: "8px",
            border: errors.endDate ? "2px solid red" : "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        {errors.endDate && (
          <div style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>{errors.endDate}</div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        onClick={handleSubmit}
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
    </div>
  );
};

export default RentalForm;