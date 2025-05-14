const TutorEarnings = () => {
    const total = 18500;
    const transactions = [
      { date: "2025-05-12", amount: 2500, student: "John Doe" },
      { date: "2025-05-10", amount: 1500, student: "Alice Ray" },
    ];
  
    return (
      <div className="p-6">
        <h2 className="text-3xl font-bold text-yellow-500 mb-4">Earnings</h2>
        <div className="mb-6">
          <div className="text-lg font-semibold text-blue-600">Total Earnings This Month:</div>
          <div className="text-4xl font-bold text-purple-600">₹{total}</div>
        </div>
        <div className="bg-white shadow rounded overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Student</th>
                <th className="px-4 py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((item, idx) => (
                <tr key={idx} className="border-b">
                  <td className="px-4 py-2">{item.date}</td>
                  <td className="px-4 py-2">{item.student}</td>
                  <td className="px-4 py-2 text-green-600 font-bold">₹{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  
}

export default TutorEarnings