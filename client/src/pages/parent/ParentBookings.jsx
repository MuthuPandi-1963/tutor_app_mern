import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChildrenBookingsThunk } from "../../store/Thunks/parent/ParentThunks";

const ParentBookings = () => {
    const {data} = useSelector(state=>state.auth)
    const [bookings,setBookings] = useState([])
    
    const dispatch = useDispatch()
    console.log(data);
    useEffect(()=>{
        const fetchBookings = async()=>{
            const response = await dispatch(getChildrenBookingsThunk(data.id))
            console.log(response);
            setBookings(response?.payload || [])
            
        }
    fetchBookings()
    },[])
    
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-bold text-blue-900 mb-6">Manage Bookings</h2>
      
      <div className="space-y-4">
        {bookings.map(booking => (
          <div key={booking._id} className="border border-blue-100 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-bold text-blue-900">{booking.subject.name}</h3>
                <p className="text-blue-600 text-sm">
                  {new Date(booking.dateTime).toLocaleDateString()} - {booking.tutor.name}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                booking.status === 'accepted' 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {booking.status}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-blue-600">{booking.student.name}</p>
              <div className="flex gap-2">
                <button className="text-sm bg-yellow-400 text-blue-900 px-3 py-1 rounded-full hover:bg-yellow-500">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParentBookings;