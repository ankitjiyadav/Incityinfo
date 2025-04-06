const DashboardCard = ({ title, value, icon }) => (
    <div className="bg-white rounded-2xl p-4 shadow-md flex items-center gap-4">
      <div className="text-4xl">{icon}</div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
  
  export default DashboardCard;
  