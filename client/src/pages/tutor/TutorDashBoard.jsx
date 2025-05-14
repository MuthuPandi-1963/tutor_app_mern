const TutorDashboard = () => {
    return (
      <div className="p-6">
        <h2 className="text-3xl font-bold text-yellow-500 mb-4">Welcome to Your Tutor Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow-md p-4 rounded border-t-4 border-blue-600">
            <h3 className="text-lg font-semibold">Total Students</h3>
            <p className="text-3xl font-bold text-blue-600">24</p>
          </div>
          <div className="bg-white shadow-md p-4 rounded border-t-4 border-yellow-500">
            <h3 className="text-lg font-semibold">Upcoming Bookings</h3>
            <p className="text-3xl font-bold text-yellow-500">5</p>
          </div>
          <div className="bg-white shadow-md p-4 rounded border-t-4 border-purple-600">
            <h3 className="text-lg font-semibold">Earnings This Month</h3>
            <p className="text-3xl font-bold text-purple-600">₹18,500</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default TutorDashboard;
  