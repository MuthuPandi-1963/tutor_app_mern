import { HiUsers, HiCalendar, HiStar } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { getChildrenBookingsThunk, getParentProfileThunk } from "../../store/Thunks/parent/ParentThunks";
import { useEffect, useState } from "react";

const DashboardHome = () => {
  const dispatch = useDispatch();
  const [profile, setProfile] = useState({});
  const [bookings, setBookings] = useState([]);
  const { data } = useSelector((state) => state.auth); // Assuming `auth` state holds user data.

  useEffect(() => {
    const fetchProfile_Bookings = async () => {
      try {
        // Fetch profile and bookings concurrently
        const profileRes = await dispatch(getParentProfileThunk(data.id)).unwrap();
        const bookingRes = await dispatch(getChildrenBookingsThunk(data.id)).unwrap();
        console.log(profileRes,bookingRes);
        
        setProfile(profileRes);
        setBookings(bookingRes);
      } catch (err) {
        console.error("Error fetching profile and bookings:", err);
      }
    };

    fetchProfile_Bookings();
  }, [dispatch, data.id]);

  const upcomingBookings = bookings.filter((b) => new Date(b.dateTime) > new Date());

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-900 mb-8">
        Welcome Back, {profile.name}
      </h1>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
          <HiUsers className="text-4xl text-yellow-500 mb-2" />
          <h3 className="text-xl font-bold text-blue-900">{profile.children?.length || 0}</h3>
          <p className="text-blue-600">Linked Children</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
          <HiCalendar className="text-4xl text-yellow-500 mb-2" />
          <h3 className="text-xl font-bold text-blue-900">{upcomingBookings.length}</h3>
          <p className="text-blue-600">Upcoming Sessions</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
          <HiStar className="text-4xl text-yellow-500 mb-2" />
          <h3 className="text-xl font-bold text-blue-900">4.8/5</h3>
          <p className="text-blue-600">Average Rating</p>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-blue-900 mb-4">Recent Bookings</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-blue-50 text-blue-900">
                <th className="p-3 text-left">Child</th>
                <th className="p-3 text-left">Tutor</th>
                <th className="p-3 text-left">Date & Time</th>
                <th className="p-3 text-left">Subject</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.slice(0, 5).map((booking) => (
                <tr key={booking._id} className="border-b border-blue-50">
                  <td className="p-3">{booking.student?.name}</td>
                  <td className="p-3">{booking.tutor?.name}</td>
                  <td className="p-3">{new Date(booking.dateTime).toLocaleString()}</td>
                  <td className="p-3">{booking.subject?.name}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        booking.status === "accepted"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
