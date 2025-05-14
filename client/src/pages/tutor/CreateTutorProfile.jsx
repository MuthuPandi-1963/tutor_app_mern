import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import GetProfileThunk from '../../store/Thunks/Tutor/Profile/GetProfileThunk';
import GetSubjectsThunk from '../../store/Thunks/subjects/GetSubjectsThunk';
import UpdateTutorProfileThunk from '../../store/Thunks/Tutor/Profile/UpdateTutorProfileThunk';

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const CreateTutorProfile = ({ userId }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [allSubjects, setAllSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    qualifications: [''],
    subjects: [],
    hourlyRate: '',
    children: [],
    parent: '',
    profileUrl: '',
    availability: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await dispatch(GetProfileThunk(userId)).unwrap();
        setUser(profileRes.data);
        const subjectsRes = await dispatch(GetSubjectsThunk()).unwrap();
        setAllSubjects(subjectsRes?.data || []);
      } catch (err) {
        console.error('Error loading:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch, userId]);

  useEffect(() => {
    if (user?._id) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        bio: user.bio || '',
        qualifications: user.qualifications || [''],
        subjects: user.subjects?.map(s => s._id || s) || [], // Handle both populated and unpopulated subjects
        hourlyRate: user.hourlyRate || '',
        children: user.children || [],
        parent: user.parent || '',
        profileUrl: user.profileUrl || '',
        availability: user.availability || [],
      });
    }
  }, [user]);

  const handleChange = (e, index, type) => {
    const { name, value } = e.target;
  
    if (type === 'qualifications') {
      const updated = [...formData.qualifications];
      updated[index] = value;
      setFormData({ ...formData, qualifications: updated });
    } else if (type === 'availability') {
      // Create a new copy of the availability array and the specific object
      const updated = [...formData.availability];
      updated[index] = {
        ...updated[index], // Copy existing properties
        [name]: value      // Update the changed property
      };
      setFormData({ ...formData, availability: updated });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addField = (type) => {
    if (type === 'qualifications') {
      setFormData({ ...formData, qualifications: [...formData.qualifications, ''] });
    } else if (type === 'availability') {
      setFormData({
        ...formData,
        availability: [...formData.availability, { day: '', startTime: '', endTime: '' }],
      });
    }
  };

  const handleSubjectChange = (selectedOptions) => {
    const values = selectedOptions.map(opt => opt.value);
    setFormData({ ...formData, subjects: values });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(UpdateTutorProfileThunk({
        ...formData,
        id: userId,
        // Ensure availability has correct structure
        availability: formData.availability.map(slot => ({
          day: slot.day,
          startTime: slot.startTime,
          endTime: slot.endTime
        }))
      }));
    } catch (err) {
      console.error('Submit error:', err);
    }
  };

  if (loading) return <p className="text-center py-8 text-gray-600">Loading profile...</p>;

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto mt-10 px-8 py-10 bg-white/70 backdrop-blur-md shadow-2xl rounded-3xl border border-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Edit Profile - <span className="text-blue-600">{user?.role?.toUpperCase()}</span>
      </h2>

      {/* Basic Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block mb-2 font-semibold text-gray-700">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold text-gray-700">Email</label>
          <input
            name="email"
            value={formData.email}
            disabled
            className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-500 cursor-not-allowed"
          />
        </div>
      </div>

      {/* Tutor-Specific */}
      {user.role === 'tutor' && (
        <>
          <div className="mb-6">
            <label className="block mb-2 font-semibold text-gray-700">Bio</label>
            <textarea
              name="bio"
              rows={3}
              value={formData.bio}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Qualifications */}
          <div className="mb-6">
            <label className="block mb-2 font-semibold text-gray-700">Qualifications</label>
            {formData.qualifications.map((q, idx) => (
              <input
                key={idx}
                className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-lg"
                value={q}
                onChange={(e) => handleChange(e, idx, 'qualifications')}
              />
            ))}
            <button
              type="button"
              onClick={() => addField('qualifications')}
              className="text-sm text-blue-600 hover:underline"
            >
              + Add Qualification
            </button>
          </div>

          {/* Subjects */}
          <div className="mb-6">
            <label className="block mb-2 font-semibold text-gray-700">Subjects</label>
            <Select
              isMulti
              name="subjects"
              options={allSubjects.map((s) => ({ label: s.name, value: s._id }))}
              value={formData.subjects.map(id => {
                const subject = allSubjects.find(s => s._id === id);
                return { label: subject?.name || '', value: id };
              })}
              onChange={handleSubjectChange}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>

          {/* Hourly Rate */}
          <div className="mb-6">
            <label className="block mb-2 font-semibold text-gray-700">Hourly Rate</label>
            <input
              type="number"
              name="hourlyRate"
              value={formData.hourlyRate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Availability */}
          <div className="mb-6">
            <label className="block mb-2 font-semibold text-gray-700">Weekly Availability</label>
            {formData.availability.map((slot, index) => (
              <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-2">
                <select
                  name="day"
                  value={slot.day}
                  onChange={(e) => handleChange(e, index, 'availability')}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Select Day</option>
                  {days.map(day => <option key={day} value={day}>{day}</option>)}
                </select>
                <input
                  type="time"
                  name="startTime"
                  value={slot.startTime}
                  onChange={(e) => handleChange(e, index, 'availability')}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="time"
                  name="endTime"
                  value={slot.endTime}
                  onChange={(e) => handleChange(e, index, 'availability')}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => addField('availability')}
              className="text-sm text-blue-600 hover:underline"
            >
              + Add Availability Slot
            </button>
          </div>
        </>
      )}

      {/* Profile Image */}
      <div className="mb-6">
        <label className="block mb-2 font-semibold text-gray-700">Profile Image URL</label>
        <input
          name="profileUrl"
          value={formData.profileUrl}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full sm:w-fit px-8 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition"
      >
        Save Changes
      </button>
    </form>
  );
};

export default CreateTutorProfile;