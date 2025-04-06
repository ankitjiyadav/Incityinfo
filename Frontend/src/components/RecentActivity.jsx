const RecentActivity = ({ activities }) => (
    <div className="bg-white rounded-2xl p-4 shadow-md">
      <h2 className="text-lg font-bold mb-3">Recent Activities</h2>
      <ul className="text-sm space-y-2">
        {activities.map((activity, idx) => (
          <li key={idx}>📌 {activity}</li>
        ))}
      </ul>
    </div>
  );
  
  export default RecentActivity;
  