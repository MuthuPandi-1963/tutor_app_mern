import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import GetSubjectsThunk from "../../store/Thunks/subjects/GetSubjectsThunk";
import createBookingThunk from "../../store/Thunks/Tutor/Booking/CreateBookingThunk";
import GetProfileThunk from "../../store/Thunks/Tutor/Profile/GetProfileThunk";

const Booking = () => {
    const params =useParams()
    const [tutor,setTutors] = useState({})
    
    
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data:user } = useSelector((state) => state.auth);
  const [subjects, setSubjects] = useState([]);
  const [formData, setFormData] = useState({
    dateTime: "",
    duration: "1",
    subject: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSubjects = async () => {
      const res = await dispatch(GetSubjectsThunk());
      const response = await dispatch(GetProfileThunk(params.id.slice(1,)))
      console.log(response);
      setTutors(response?.payload?.data)
      
      setSubjects(res?.payload?.data || []);
    };
    fetchSubjects();
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(createBookingThunk({
        student: user.id,
        tutor: tutor._id,
        ...formData
      }));
      navigate("/");
    } catch (error) {
      console.error("Booking error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-blue-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Schedule Your Session</h1>
          <p className="text-xl mb-8">Book 1-on-1 lessons with expert tutors</p>
        </div>
      </div>

      {/* Booking Form */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center mb-8">
            <img
              src={tutor.profileUrl}
              alt={tutor.name}
              className="w-16 h-16 rounded-full object-cover mr-4"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{tutor.name}</h2>
              <p className="text-sm text-gray-500">{tutor.email}</p>
              <div className="mt-2">
                <span className="text-lg font-bold text-blue-800">
                  ₹{tutor.hourlyRate}/hr
                </span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Date & Time
              </label>
              <input
                type="datetime-local"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={formData.dateTime}
                onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Duration (hours)
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              >
                <option value="1">1 Hour</option>
                <option value="1.5">1.5 Hours</option>
                <option value="2">2 Hours</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Subject
              </label>
              <select
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              >
                <option value="">Select Subject</option>
                {subjects.map((subject) => (
                  <option key={subject._id} value={subject._id}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-500 text-blue-900 py-3 rounded-full font-bold hover:bg-yellow-400 transition disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Confirm Booking'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;