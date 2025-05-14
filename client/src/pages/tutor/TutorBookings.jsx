import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getTutorBookings from '../../store/Thunks/Tutor/Booking/getBookingStudent';
import updateBookingStatus from '../../store/Thunks/Tutor/Booking/UpdateBookingStatus';

const TutorBookings = () => {
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.auth);
  const { bookings, isLoading, error } = useSelector(state => state.bookings);

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    if (data?.id) {
      dispatch(getTutorBookings(data.id));
    }
  }, [dispatch, data?.id]);

  const handleStatusChange = (booking, status) => {
    setSelectedBooking(booking);
    setNewStatus(status);
    setShowConfirmDialog(true);
  };

  const confirmStatusUpdate = async () => {
    if (selectedBooking && newStatus) {
      await dispatch(updateBookingStatus({
        bookingId: selectedBooking._id,
        status: newStatus,
      }));
      setShowConfirmDialog(false);
      setSelectedBooking(null);
      setNewStatus('');
      dispatch(getTutorBookings(data.id));
    }
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: 'bg-yellow-100 text-yellow-800',
      accepted: 'bg-green-100 text-green-800',
      declined: 'bg-red-100 text-red-800',
      completed: 'bg-blue-100 text-blue-800'
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 md:p-8 p-2 ">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Manage Bookings</h1>
          <p className="text-gray-600 mt-2">Review and manage your upcoming sessions</p>
        </div>

        {isLoading && (
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded-lg" />
            ))}
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-4">
            Error loading bookings: {error}
          </div>
        )}

        {!isLoading && bookings.length === 0 && (
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <p className="text-gray-500">No upcoming bookings found</p>
          </div>
        )}

        <div className="grid gap-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
            >
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-500 text-xl">
                        {booking?.student?.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{booking?.student?.name}</h3>
                    <p className="text-gray-500 text-sm">
                      {new Date(booking.dateTime).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                      })}
                      {' • '}
                      {new Date(booking.dateTime).toLocaleTimeString([], {
                        hour: 'numeric',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {getStatusBadge(booking.status)}
                  
                  {booking.status === 'pending' ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStatusChange(booking, 'accepted')}
                        className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleStatusChange(booking, 'declined')}
                        className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        Decline
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2 opacity-50 cursor-not-allowed">
                      <button
                        disabled
                        className="px-4 py-2 bg-gray-100 text-gray-500 rounded-lg"
                      >
                        Accept
                      </button>
                      <button
                        disabled
                        className="px-4 py-2 bg-gray-100 text-gray-500 rounded-lg"
                      >
                        Decline
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Confirmation Dialog */}
        {showConfirmDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
              <h3 className="text-xl font-semibold mb-4">Confirm Status Change</h3>
              <p className="text-gray-600 mb-6">
                You're changing the status of{' '}
                <span className="font-semibold">{selectedBooking?.student?.name}</span>'s booking to{' '}
                <span className="font-semibold capitalize">{newStatus}</span>.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowConfirmDialog(false)}
                  className="px-5 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmStatusUpdate}
                  className={`px-5 py-2 rounded-lg ${
                    newStatus === 'accepted'
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-red-600 text-white hover:bg-red-700'
                  }`}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorBookings;