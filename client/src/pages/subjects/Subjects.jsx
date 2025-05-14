import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import GetSubjectsThunk from "../../store/Thunks/subjects/GetSubjectsThunk";
import { FaBook, FaComputer } from "react-icons/fa6";

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

  const getColor = (index) => {
    const colors = [
      "#0063ff", "#00c986", "#922aee", "#ea7516", "#075267",
      "#986d1d", "#b93838", "#464646"
    ];
    return colors[index % colors.length];
  };

  const getIcon = (subjectName = "") => {
    const keywords = subjectName.toLowerCase();
    if (keywords.includes("program") || keywords.includes("web")) return <FaComputer />;
    return <FaBook />;
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
    <div className="subject-container my-10 px-4">
      <h2 className="text-5xl font-semibold mb-6 text-center text-yellow-500">
        Available Subjects
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {subjects.map((subject, index) => {
          const color = getColor(index);
          return (
            <motion.div
              key={subject._id}
              initial={{ opacity: 0, x: -200 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                delay: 0.1 * (index + 1),
              }}
              className="relative bg-gradient-to-br from-purple-500 to-blue-600 p-2 rounded-xl shadow-xl transform transition-transform duration-300 hover:scale-105"
            >
              <img
                src={subject.image}
                alt={subject.name}
                className="w-full h-80 object-cover rounded-md mb-4"
              />
              <h3 className="font-semibold text-xl text-white mb-2">{subject.name}</h3>
              <p className="text-white text-sm">{subject.description}</p>
              <div
                style={{
                  color: color,
                  backgroundColor: color + "30",
                }}
                className="w-10 h-10 rounded-md flex items-center justify-center absolute top-4 right-4"
              >
                {getIcon(subject.name)}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default SubjectsList;
