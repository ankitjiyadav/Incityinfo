const ConnectedCallList = ({ records }) => (
    <div className="bg-white rounded-2xl p-4 shadow-md">
      <h2 className="text-lg font-bold mb-3">Connected Calls</h2>
      <table className="w-full text-sm border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Customer</th>
            <th className="p-2 border">Telecaller</th>
            <th className="p-2 border">Call Time</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {records.map((call, idx) => (
            <tr key={idx} className="text-center">
              <td className="p-2 border">{call.customerName}</td>
              <td className="p-2 border">{call.telecallerName}</td>
              <td className="p-2 border">{new Date(call.callTime).toLocaleString()}</td>
              <td className="p-2 border">{call.response}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
  export default ConnectedCallList;
  