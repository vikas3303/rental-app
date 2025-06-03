import React, { useState, useMemo } from "react";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Plus,
  Eye,
  Filter,
} from "lucide-react";
// ADDED: Import the actual context
import { useRentals } from "../../contexts/RentalsContext";
import { useEquipment } from "../../contexts/EquipmentContext";

// REMOVED: Mock data - now using real data from context

// Enhanced Rental Calendar Component
const RentalCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedRental, setSelectedRental] = useState(null);
  const [viewType, setViewType] = useState("month"); // 'month' or 'week'
  const [equipmentFilter, setEquipmentFilter] = useState("");

  // CHANGED: Use real context data instead of mock data
  const { rentals } = useRentals();
  const { equipment } = useEquipment();

  // Filter rentals based on equipment selection
  const filteredRentals = useMemo(() => {
    return equipmentFilter
      ? rentals.filter((rental) => rental.equipmentId === equipmentFilter)
      : rentals;
  }, [rentals, equipmentFilter]);

  // Get rentals for a specific date
  const getRentalsForDate = (date) => {
    const dateStr = date.toISOString().split("T")[0];
    return filteredRentals.filter((rental) => {
      const startDate = new Date(rental.startDate);
      const endDate = new Date(rental.endDate);
      const checkDate = new Date(dateStr);
      return checkDate >= startDate && checkDate <= endDate;
    });
  };

  // ADDED: Get equipment name by ID
  const getEquipmentName = (equipmentId) => {
    const eq = equipment.find(e => e.id === equipmentId);
    return eq ? eq.name : equipmentId;
  };

  // Generate calendar days for current month
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const navigateMonth = (direction) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-500";
      case "Reserved":
        return "bg-blue-500";
      case "Completed":
        return "bg-gray-500";
      case "Cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  const days = generateCalendarDays();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Calendar className="text-blue-600" />
            Rental Calendar
          </h2>

          {/* Equipment Filter */}
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-500" />
            <select
              value={equipmentFilter}
              onChange={(e) => setEquipmentFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm"
            >
              <option value="">All Equipment</option>
              {/* CHANGED: Use real equipment data */}
              {equipment.map((eq) => (
                <option key={eq.id} value={eq.id}>
                  {eq.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewType("month")}
            className={`px-3 py-1 rounded text-sm ${
              viewType === "month"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setViewType("week")}
            className={`px-3 py-1 rounded text-sm ${
              viewType === "week"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Week
          </button>
        </div>
      </div>

      {/* Calendar Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigateMonth(-1)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronLeft size={20} />
        </button>

        <h3 className="text-xl font-semibold">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>

        <button
          onClick={() => navigateMonth(1)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="overflow-x-auto">
        <div className="grid grid-cols-7 gap-1 mb-4">
          {/* Day headers */}
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="p-2 text-center font-medium text-gray-600 border-b"
            >
              {day}
            </div>
          ))}

          {/* Calendar days */}
          {days.map((day, index) => {
            const dayRentals = day ? getRentalsForDate(day) : [];
            const isToday =
              day && day.toDateString() === new Date().toDateString();

            return (
              <div
                key={index}
                className={`min-h-24 p-1 border border-gray-200 ${
                  day ? "bg-white hover:bg-gray-50" : "bg-gray-100"
                } ${isToday ? "ring-2 ring-blue-500" : ""}`}
              >
                {day && (
                  <>
                    <div
                      className={`text-sm font-medium mb-1 ${
                        isToday ? "text-blue-600" : "text-gray-900"
                      }`}
                    >
                      {day.getDate()}
                    </div>

                    {/* Rental indicators */}
                    <div className="space-y-1">
                      {dayRentals.slice(0, 2).map((rental) => (
                        <div
                          key={rental.id}
                          onClick={() => setSelectedRental(rental)}
                          className={`text-xs p-1 rounded cursor-pointer text-white truncate ${getStatusColor(
                            rental.status
                          )}`}
                          title={`${getEquipmentName(rental.equipmentId)} - ${rental.customerName || rental.customerId}`}
                        >
                          {/* CHANGED: Use getEquipmentName function */}
                          {getEquipmentName(rental.equipmentId)}
                        </div>
                      ))}

                      {dayRentals.length > 2 && (
                        <div className="text-xs text-gray-500 text-center">
                          +{dayRentals.length - 2} more
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-sm border-t pt-4">
        <span className="font-medium">Status:</span>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span>Reserved</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span>Active</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-500 rounded"></div>
          <span>Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded"></div>
          <span>Cancelled</span>
        </div>
      </div>

      {/* Rental Details Modal */}
      {selectedRental && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold">Rental Details</h3>
                <button
                  onClick={() => setSelectedRental(null)}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Equipment:</span>
                  {/* CHANGED: Use getEquipmentName function */}
                  <span>{getEquipmentName(selectedRental.equipmentId)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-medium">Customer:</span>
                  {/* CHANGED: Use customerName or customerId */}
                  <span>{selectedRental.customerName || selectedRental.customerId}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-medium">Period:</span>
                  <span>
                    {new Date(selectedRental.startDate).toLocaleDateString()} -{" "}
                    {new Date(selectedRental.endDate).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="font-medium">Status:</span>
                  <span
                    className={`px-2 py-1 rounded text-xs text-white ${getStatusColor(
                      selectedRental.status
                    )}`}
                  >
                    {selectedRental.status}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="font-medium">Total Cost:</span>
                  <span className="font-bold">${selectedRental.totalCost || 0}</span>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    // Handle edit action
                    console.log("Edit rental:", selectedRental.id);
                    setSelectedRental(null);
                  }}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                  Edit Rental
                </button>
                <button
                  onClick={() => setSelectedRental(null)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4 mt-6 pt-4 border-t">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">
            {filteredRentals.filter((r) => r.status === "Reserved").length}
          </div>
          <div className="text-sm text-gray-600">Reserved</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            {filteredRentals.filter((r) => r.status === "Active").length}
          </div>
          <div className="text-sm text-gray-600">Active</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-600">
            {filteredRentals.filter((r) => r.status === "Completed").length}
          </div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">
            ${filteredRentals.reduce((sum, r) => sum + (r.totalCost || 0), 0)}
          </div>
          <div className="text-sm text-gray-600">Total Revenue</div>
        </div>
      </div>
    </div>
  );
};

export default RentalCalendar;