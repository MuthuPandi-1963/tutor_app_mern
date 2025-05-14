import { 
  HiOutlineCalendar as CalendarIcon,
  HiOutlineClock as ClockIcon,
  HiOutlineUser as UserIcon,
  HiOutlineVideoCamera as VideoCameraIcon,
  HiOutlineCheckCircle as CheckCircleIcon,
  HiOutlineStar as StarIcon,
} from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import getStudentBookings from '../../store/Thunks/Tutor/Booking/getbookingByStudent';
import { useEffect, useState } from 'react';

const StudentClasses = () => {
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.auth);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchStudentsBooking = async () => {
      const res = await dispatch(getStudentBookings(data.id));
      setBookings(res.payload);
    };
    fetchStudentsBooking();
  }, [dispatch, data.id]);

  const upcomingClasses = bookings?.filter(b => 
  new Date(b.dateTime) > new Date()  && b.status === 'accepted'
);
const completedClasses = bookings?.filter(b => 
  new Date(b.dateTime) < new Date() && b.status === 'accepted'
);

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <h2 className="text-4xl font-bold text-gray-800 mb-10 text-center">
        My Learning Dashboard
        <span className="block text-xl text-emerald-600 mt-2 font-medium">
          {bookings.length} Total Sessions
        </span>
      </h2>

      {/* Upcoming Classes Section */}
      <section className="mb-12">
        <div className="flex items-center mb-6 px-4">
          <CalendarIcon className="w-8 h-8 text-emerald-600 mr-3" />
          <h3 className="text-2xl font-bold text-gray-800">
            Upcoming Classes
            <span className="ml-3 text-emerald-600">({upcomingClasses?.length || 0})</span>
          </h3>
        </div>
        
        <div className="grid  px-4">
          {upcomingClasses?.length ? upcomingClasses.map(cls => (
            <div key={cls._id} className="bg-white rounded-2xl shadow-xl p-6 transform transition hover:scale-105 hover:shadow-2xl">
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                  {cls.subject.category || 'General'}
                </span>
                <span className="text-sm text-emerald-600 font-medium">
                  {cls.duration} mins
                </span>
              </div>
              
              <h4 className="text-xl font-bold text-gray-800 mb-3">{cls.subject.name}</h4>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-600">
                  <UserIcon className="w-5 h-5 mr-2 text-purple-600" />
                  <span className="font-medium">{cls.tutor.name}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <ClockIcon className="w-5 h-5 mr-2 text-amber-600" />
                  <span>{new Date(cls.dateTime).toLocaleString()}</span>
                </div>
              </div>

              {cls.meetingLink && (
                <a href={cls.meetingLink} 
                   className="w-full inline-flex items-center justify-center bg-emerald-600 text-white px-4 py-2 rounded-lg 
                             hover:bg-emerald-700 transition-colors">
                  <VideoCameraIcon className="w-5 h-5 mr-2" />
                  Join Now
                </a>
              )}
            </div>
          )) : (
            <div className="col-span-full text-center py-12 bg-white rounded-2xl shadow-lg">
              <p className="text-2xl text-gray-400">No upcoming classes scheduled</p>
            </div>
          )}
        </div>
      </section>

      {/* Completed Classes Section */}
      <section>
        <div className="flex items-center mb-6 px-4">
          <CheckCircleIcon className="w-8 h-8 text-gray-600 mr-3" />
          <h3 className="text-2xl font-bold text-gray-800">
            Completed Classes
            <span className="ml-3 text-gray-500">({completedClasses?.length || 0})</span>
          </h3>
        </div>

        <div className="grid  gap-6 px-4">
          {completedClasses?.length ? completedClasses.map(cls => (
            <div key={cls._id} className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-emerald-500">
              <div className="flex justify-between items-start mb-3">
                <span className="text-sm font-medium text-gray-500">
                  {new Date(cls.dateTime).toLocaleDateString()}
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                  Completed
                </span>
              </div>

              <h4 className="text-lg font-bold text-gray-800 mb-2">{cls.subject.name}</h4>
              
              <div className="flex items-center mb-4">
                <UserIcon className="w-5 h-5 mr-2 text-purple-600" />
                <span className="text-gray-600">{cls.tutor.name}</span>
              </div>

              {cls.rating ? (
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className={`w-5 h-5 ${i < cls.rating ? 'fill-current' : ''}`} />
                  ))}
                </div>
              ) : (
                <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-lg
                             hover:from-emerald-600 hover:to-teal-600 transition-all">
                  Leave Review
                </button>
              )}
            </div>
          )) : (
            <div className="col-span-full text-center py-12 bg-white rounded-2xl shadow-lg">
              <p className="text-2xl text-gray-400">No completed classes yet</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default StudentClasses;