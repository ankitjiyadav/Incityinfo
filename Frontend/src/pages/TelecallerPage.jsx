import { useEffect, useState } from 'react';
import {
  getLeads,
  addLead,
  editAddress,
  deleteLead,
  updateStatus,
} from '../services/leadApi';

const statusOptions = {
  Connected: ['Discussed', 'Callback', 'Interested'],
  'Not Connected': ['Busy', 'RNR', 'Switched Off'],
};

const TelecallerPage = () => {
  const [leads, setLeads] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newLead, setNewLead] = useState({ name: '', email: '', phone: '', address: '' });

  const loadLeads = async () => {
    const res = await getLeads();
    setLeads(res.data);
  };

  const handleAdd = async () => {
    if (!newLead.name || !newLead.email || !newLead.phone) {
      alert('Name, Email, and Phone are required!');
      return;
    }
    const res = await addLead(newLead);

    setNewLead({ name: '', email: '', phone: '', address: '' });
    setLeads(prev => [...prev, res.data]);
    setShowModal(false);
  };

  const handleEdit = async (id, address) => {
    const res = await editAddress(id, address);
    setLeads(leads.map((lead) => (lead._id === id ? res.data : lead)));
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;
    await deleteLead(id);
    setLeads(leads.filter((l) => l._id !== id));
  };

  const handleStatusUpdate = async (id, status, response) => {
    const res = await updateStatus(id, { status, response });
    setLeads(leads.map((lead) => (lead._id === id ? res.data : lead)));
  };

  useEffect(() => {
    loadLeads();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">📞 Customer Leads</h2>

      {/* Add Button */}
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg mb-4 hover:bg-blue-700"
      >
        Add New
      </button>

      {/* Leads Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow-md">
          <thead>
            <tr className="bg-blue-100 text-left text-blue-800">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Address</th>
              <th className="p-3">Status</th>
              <th className="p-3">Response</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead._id} className="border-t hover:bg-gray-50">
                <td className="p-3">{lead.name}</td>
                <td className="p-3">{lead.email}</td>
                <td className="p-3">{lead.phone}</td>
                <td className="p-3 flex gap-2">
                  <input
                    type="text"
                    className="border rounded px-2 py-1 w-full"
                    value={lead.tempAddress ?? lead.address}
                    onChange={(e) =>
                      setLeads((prev) =>
                        prev.map((l) =>
                          l._id === lead._id ? { ...l, tempAddress: e.target.value } : l
                        )
                      )
                    }
                  />
                  <button
                    onClick={() => handleEdit(lead._id, lead.tempAddress ?? lead.address)}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                  >
                    Save
                  </button>
                </td>

                <td className="p-3 space-x-1">
                  <button
                    className={`px-2 py-1 rounded text-sm ${
                      lead.status === 'Connected' ? 'bg-blue-600 text-white' : 'bg-gray-200'
                    }`}
                    onClick={() => handleStatusUpdate(lead._id, 'Connected', '')}
                  >
                    Connected
                  </button>
                  <button
                    className={`px-2 py-1 rounded text-sm ${
                      lead.status === 'Not Connected' ? 'bg-red-600 text-white' : 'bg-gray-200'
                    }`}
                    onClick={() => handleStatusUpdate(lead._id, 'Not Connected', '')}
                  >
                    Not Connected
                  </button>
                </td>

                <td className="p-3">
                  {lead.status && (
                    <select
                      value={lead.response || ''}
                      onChange={(e) =>
                        handleStatusUpdate(lead._id, lead.status, e.target.value)
                      }
                      className="border rounded px-2 py-1 w-full"
                    >
                      <option value="">Select</option>
                      {statusOptions[lead.status]?.map((opt) => (
                        <option key={opt}>{opt}</option>
                      ))}
                    </select>
                  )}
                </td>

                <td className="p-3">
                  <button
                    onClick={() => handleDelete(lead._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md space-y-4">
            <h3 className="text-xl font-bold mb-4 text-blue-600">Add New Lead</h3>
            {['name', 'email', 'phone', 'address'].map((field) => (
              <input
                key={field}
                type="text"
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={newLead[field]}
                onChange={(e) => setNewLead({ ...newLead, [field]: e.target.value })}
                className="border border-gray-300 w-full px-3 py-2 rounded"
              />
            ))}
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TelecallerPage;
