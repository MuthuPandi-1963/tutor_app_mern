import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import GetSubjectsThunk from "../../store/Thunks/subjects/GetSubjectsThunk";
import { FaBook, FaComputer } from "react-icons/fa6";

const SubjectCard = () => {
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
    <div className="container py-14 md:py-24">
      {/* header */}
      <div className="space-y-4 p-6 text-center max-w-[600px] mx-auto mb-5">
        <h1 className="uppercase font-semibold text-orange-600">Our Tutor Subjects</h1>
        <p className="font-semibold text-3xl">Find Online Tutor in Any Subject</p>
      </div>

      {/* subject cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
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
              className="border rounded-lg shadow-md border-secondary/20 p-4 flex justify-center items-center gap-4 hover:scale-105 duration-300 hover:shadow-2xl cursor-pointer"
            >
              <div
                style={{
                  color: color,
                  backgroundColor: color + "30",
                }}
                className="w-10 h-10 rounded-md flex items-center justify-center"
              >
                {getIcon(subject.name)}
              </div>
              <p>{subject.name}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default SubjectCard;
