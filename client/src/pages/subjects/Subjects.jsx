import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import GetSubjectsThunk from "../../store/Thunks/subjects/GetSubjectsThunk";
import { FaBook, FaComputer, FaCode, FaCalculator } from "react-icons/fa6";

const SubjectsList = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await dispatch(GetSubjectsThunk());
        setSubjects(response.payload.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch subjects", err);
        setError("Failed to load subjects");
        setLoading(false);
      }
    };
    fetchSubjects();
  }, [dispatch]);
  

  // ... existing state and dispatch logic ...

  const getIcon = (subjectName = "") => {
    const keywords = subjectName.toLowerCase();
    if (keywords.includes("program") || keywords.includes("web")) return <FaComputer className="text-xl" />;
    if (keywords.includes("math")) return <FaCalculator className="text-xl" />;
    if (keywords.includes("code")) return <FaCode className="text-xl" />;
    return <FaBook className="text-xl" />;
  };

 if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] text-xl text-blue-500">
        Loading Subjects...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 font-semibold py-10">
        {error}
      </div>
    );
  }

  return (
    <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-yellow-500 bg-clip-text text-transparent"
      >
        Explore Subjects
      </motion.h2>

      <div className="grid mx-auto w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:flex xl:flex-wrap gap-12">
        {subjects.map((subject, index) => (
          <motion.div
            key={subject._id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 120,
              delay: index * 0.05,
            }}
            whileHover={{ y: -5 }}
            className="group bg-blue-100 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden w-80"
          >
            <div className="relative">
              <img
                src={subject.image}
                alt={subject.name}
                className="w-full h-80 object-cover object-center"
              />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-sm">
                <span className={`text-${getColorClass(index)}-600`}>
                  {getIcon(subject.name)}
                </span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {subject.name}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-3">
                {subject.description}
              </p>
              
              <div className="mt-4 flex items-center justify-between">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-${getColorClass(index)}-100 text-${getColorClass(index)}-800`}>
                  {subject.category || "General"}
                </span>
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  View Courses →
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Helper function for Tailwind class-safe colors
const getColorClass = (index) => {
  const colors = ["blue", "green", "purple", "orange", "teal", "yellow", "red", "gray"];
  return colors[index % colors.length];
};

export default SubjectsList;