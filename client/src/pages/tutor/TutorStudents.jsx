const MyStudents = () =>{
  const students = [
    { name: "John Doe", subject: "Math", progress: "80%" },
    { name: "Jane Smith", subject: "English", progress: "95%" },
  ];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-yellow-500 mb-4">My Students</h2>
      <div className="bg-white shadow rounded overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Subject</th>
              <th className="px-4 py-2">Progress</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, idx) => (
              <tr key={idx} className="border-b">
                <td className="px-4 py-2">{student.name}</td>
                <td className="px-4 py-2">{student.subject}</td>
                <td className="px-4 py-2">{student.progress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

  export default MyStudents;
  
  // Repeat similar structure for Bookings.jsx and Earnings.jsx
  