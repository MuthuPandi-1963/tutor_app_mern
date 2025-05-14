import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import GetAllTutorsThunk from "../../store/Thunks/Tutor/Profile/GetAllTutorsThunk";
import GetSubjectsThunk from "../../store/Thunks/subjects/GetSubjectsThunk";
import { Link } from "react-router-dom";

const TutorList = () => {
    const [tutors, setTutors] = useState([]);
    const [allSubjects, setAllSubjects] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            const tutorsRes = await dispatch(GetAllTutorsThunk());
            const subjectsRes = await dispatch(GetSubjectsThunk());
            
            setTutors(tutorsRes?.payload?.data || []);
            setAllSubjects(subjectsRes?.payload?.data || []);
        };
        fetchData();
    }, [dispatch]);
    console.log(tutors);
    
    const getSubjectName = (subjectId) => {
        const subject = allSubjects.find(s => s._id === subjectId);
        return subject?.name || 'Unknown Subject';
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <div className="bg-blue-800 text-white py-16">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold mb-4">Find Your Perfect Tutor</h1>
                    <p className="text-xl mb-8">We help you find perfect tutor for 1-on-1 lessons. It's completely free and private</p>
                    <div className="flex justify-center gap-4">
                        <button className="bg-yellow-500 text-blue-900 px-8 py-3 rounded-full font-bold hover:bg-yellow-400 transition">
                            Get Started
                        </button>
                        <button className="border-2 border-white px-8 py-3 rounded-full hover:bg-white hover:text-blue-900 transition">
                            How it works
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="max-w-6xl mx-auto py-12 px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <div className="text-3xl font-bold text-blue-800">862</div>
                        <div className="text-gray-600">Expert Tutors</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-blue-800">19,999+</div>
                        <div className="text-gray-600">Hours Content</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-blue-800">286</div>
                        <div className="text-gray-600">Subjects & Courses</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-blue-800">72,877+</div>
                        <div className="text-gray-600">Active Students</div>
                    </div>
                </div>
            </div>

            {/* Tutors Grid */}
            <div className="max-w-6xl mx-auto px-4 py-12">
                <h2 className="text-3xl font-bold text-blue-800 mb-8">All Tutors</h2>
                
                {tutors.length === 0 ? (
                    <p className="text-gray-600">No tutors available.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {tutors.map((tutor) => (
                            <div
                                key={tutor._id}
                                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="p-6">
                                    <div className="flex items-center mb-4">
                                        <img
                                            src={tutor.profileUrl}
                                            alt={tutor.name}
                                            className="w-16 h-16 rounded-full object-cover mr-4"
                                        />
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800">{tutor.name}</h3>
                                            <p className="text-sm text-gray-500">{tutor.email}</p>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <h4 className="font-semibold text-gray-700 mb-2">Subjects:</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {tutor.subjects.map((subjectId, idx) => (
                                                <span 
                                                    key={idx}
                                                    className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                                                >
                                                    {getSubjectName(subjectId)}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <p className="text-gray-600 text-sm mb-4">{tutor.bio}</p>

                                    <div className="mb-4">
                                        <h4 className="font-semibold text-gray-700 mb-2">Qualifications:</h4>
                                        <ul className="list-disc list-inside text-gray-600 text-sm">
                                            {tutor.qualifications.map((q, idx) => (
                                                <li key={idx}>{q}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="mb-4">
                                        <h4 className="font-semibold text-gray-700 mb-2">Availability:</h4>
                                        <ul className="text-gray-600 text-sm">
                                            {tutor.availability.map((slot, idx) => (
                                                <li key={idx} className="mb-1">
                                                    {slot.day}: {slot.startTime} - {slot.endTime}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="flex justify-between items-center mt-4">
                                        <span className="text-lg font-bold text-blue-800">
                                            ₹{tutor.hourlyRate}/hr
                                        </span>
                                        <Link to={`/student/bookings/:${tutor._id}`} className="bg-yellow-500 text-blue-900 px-6 py-2 rounded-full font-semibold hover:bg-yellow-400 transition">
                                            Book Now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TutorList;