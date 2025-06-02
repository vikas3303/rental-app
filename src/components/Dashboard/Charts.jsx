import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const data = [
  { name: 'Available', value: 8 },
  { name: 'Rented', value: 5 },
  { name: 'Overdue', value: 2 },
  { name: 'Maintenance', value: 1 }
];

function Charts() {
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Rental Activity Overview</h2>

      <div className="bg-gray-400 p-6 rounded-2xl shadow-lg">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#4F46E5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Charts;
