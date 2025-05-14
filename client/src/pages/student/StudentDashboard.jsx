import React from 'react'

const StudentDashboard = () => {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md">📚 Enrolled Classes: 3</div>
          <div className="bg-white p-4 rounded-lg shadow-md">✅ Assignments Completed: 7</div>
          <div className="bg-white p-4 rounded-lg shadow-md">📅 Upcoming Class: Tomorrow</div>
        </div>
      </div>
    );
  };
  
  export default StudentDashboard

  