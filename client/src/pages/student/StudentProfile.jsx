const StudentProfile = () => {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">My Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Full Name" className="input input-bordered w-full" />
          <input type="email" placeholder="Email" className="input input-bordered w-full" />
          <input type="text" placeholder="Phone" className="input input-bordered w-full" />
          <textarea placeholder="Bio" className="textarea textarea-bordered w-full"></textarea>
        </div>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Update Profile</button>
      </div>
    );
  };
  
  export default StudentProfile;
  