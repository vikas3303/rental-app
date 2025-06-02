// src/pages/RentalsPage.jsx
import RentalList from '../components/Rentals/RentalList';
import RentalForm from '../components/Rentals/RentalForm';
import RentalCalendar from '../components/Rentals/RentalCalendar';

function RentalsPage() {
  return (
    <div className="bg-red-200 min-h-screen text-gray-800 p-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6">Rentals Dashboard</h2>

      <RentalList />
      <RentalCalendar />
      <RentalForm />
    </div>
  );
}

export default RentalsPage;
