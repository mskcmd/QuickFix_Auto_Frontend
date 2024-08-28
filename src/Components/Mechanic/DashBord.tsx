function Dashboard() {
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Bar Graph */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Monthly Revenue</h2>
            <div className="h-64 flex items-end justify-around">
              {[60, 45, 80, 50, 70, 30].map((height, index) => (
                <div key={index} className="w-12 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-lg" style={{height: `${height}%`}}>
                  <div className="text-xs text-center mt-2">{`$${height * 100}`}</div>
                </div>
              ))}
            </div>
            <div className="flex justify-around mt-2 text-sm text-gray-600">
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month) => (
                <div key={month}>{month}</div>
              ))}
            </div>
          </div>
  
          {/* Pie Chart */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Customer Segments</h2>
            <div className="relative h-64 w-64 mx-auto">
              <svg viewBox="0 0 36 36" className="w-full h-full">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#4CAF50" strokeWidth="2" strokeDasharray="60, 100"/>
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#FFC107" strokeWidth="2" strokeDasharray="25, 100" strokeDashoffset="-60"/>
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E91E63" strokeWidth="2" strokeDasharray="15, 100" strokeDashoffset="-85"/>
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="text-3xl font-bold text-gray-800">100%</div>
                <div className="text-sm text-gray-600">Total</div>
              </div>
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              <div className="flex items-center"><div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div> Premium (60%)</div>
              <div className="flex items-center"><div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div> Standard (25%)</div>
              <div className="flex items-center"><div className="w-3 h-3 bg-pink-500 rounded-full mr-2"></div> Basic (15%)</div>
            </div>
          </div>
        </div>
  
        {/* User Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <h2 className="text-xl font-semibold p-4 bg-gray-50 border-b text-gray-700">Recent Users</h2>
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { name: 'John Doe', email: 'john@example.com', status: 'Active' },
                { name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
                { name: 'Bob Johnson', email: 'bob@example.com', status: 'Active' },
              ].map((user, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    );
  }
  
  export default Dashboard;