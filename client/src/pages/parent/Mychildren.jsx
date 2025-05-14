import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SlideRight } from "../../utility/animation";
import { useDispatch, useSelector } from "react-redux";
import HeroImg from "../../assets/parent.jpg";
import { sendLinkRequestThunk, verifyStudentOtpThunk } from "../../store/Thunks/parent/ParentThunks";
import { FaChild, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const MyChildren = () => {
  const dispatch = useDispatch();
  const { data: user } = useSelector(state => state.auth);
  const [step, setStep] = useState(1); // 1 = request link, 2 = verify OTP
  const [formData, setFormData] = useState({
    studentEmail: "",
    otp: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
        console.log(user);

  useEffect(() => {
    // Fetch parent's children when component mounts
    if (user?.role === 'parent' && user.children) {
      // Dispatch action to fetch full child details if needed
    }
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLinkRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
        
      const response = await dispatch(sendLinkRequestThunk({
        parentId: user.id,
        studentEmail: formData.studentEmail
      }));
      
      if (response.payload.success) {
        setStep(2);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
        console.log("done");
        
      const response = await dispatch(verifyStudentOtpThunk({
        studentEmail: formData.studentEmail,
        otp: formData.otp,
        parentId: user.id
      }));
      console.log(response);
      
      if (response.payload.success) {
        setShowAddForm(false);
        setStep(1);
        setFormData({ studentEmail: "", otp: "" });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container grid grid-cols-1 md:grid-cols-2 min-h-[650px] relative bg-gradient-to-br gap-x-6 ">
      {/* Hero image with blue accent */}
      <div className="flex justify-center items-center relative bg-blue-600">
        <motion.img
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 50, delay: 1, duration: 1 }}
          src={HeroImg}
          alt="Family illustration"
          className="w-[350px] md:w-[550px] xl:w-[700px] transform -rotate-3 shadow-2xl border-8 border-yellow-400"
        />
        <div className="absolute bottom-10 left-10 bg-yellow-400 p-4 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-blue-800">Stay Connected</h3>
          <p className="text-blue-700">Monitor your child's learning journey</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-center py-14 md:pr-16 xl:pr-40 md:py-0">
        <div className="text-center md:text-left space-y-6">
          <motion.h1
            variants={SlideRight(0.6)}
            initial="hidden"
            animate="visible"
            className="text-5xl font-bold lg:text-6xl bg-gradient-to-r from-blue-600 to-yellow-500 bg-clip-text text-transparent"
          >
            My Children
          </motion.h1>

          {/* Existing Children List */}
          {user?.children?.length > 0 && (
            <motion.div variants={SlideRight(0.7)} initial="hidden" animate="visible">
              <h3 className="text-2xl font-semibold mb-4 text-blue-800 flex items-center gap-2">
                <FaChild className="text-yellow-500" />
                Linked Children
              </h3>
              <div className="space-y-3">
                {user.children.map(child => (
                  <div 
                    key={child._id} 
                    className="p-4 bg-white rounded-lg border-2 border-blue-100 shadow-md hover:border-yellow-300 transition-all"
                  >
                    <p className="font-medium text-blue-800">{child.name}</p>
                    <p className="text-blue-600">{child.email}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Add Child Section */}
          {showAddForm ? (
            <form onSubmit={step === 1 ? handleLinkRequest : handleVerifyOTP}>
              <div className="space-y-4">
                <motion.div variants={SlideRight(0.8)} initial="hidden" animate="visible">
                  <h3 className="text-xl font-bold text-blue-800 mb-4 border-l-4 border-yellow-400 pl-3">
                    {step === 1 ? "🔗 Link New Child" : "🔒 Verify OTP"}
                  </h3>
                </motion.div>

                {step === 1 ? (
                  <motion.div variants={SlideRight(0.9)} initial="hidden" animate="visible">
                    <input
                      type="email"
                      name="studentEmail"
                      placeholder="Child's Email Address"
                      className="w-full p-3 border-2 border-blue-200 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-blue-100"
                      value={formData.studentEmail}
                      onChange={handleInputChange}
                      required
                    />
                  </motion.div>
                ) : (
                  <motion.div variants={SlideRight(0.9)} initial="hidden" animate="visible">
                    <input
                      type="text"
                      name="otp"
                      placeholder="Enter 6-digit OTP"
                      className="w-full p-3 border-2 border-blue-200 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-blue-100"
                      value={formData.otp}
                      onChange={handleInputChange}
                      required
                    />
                    <p className="text-sm mt-2 text-blue-600">
                      📩 OTP sent to {formData.studentEmail}
                    </p>
                  </motion.div>
                )}

                {error && (
                  <div className="p-3 bg-yellow-100 text-red-600 rounded-lg border border-yellow-200">
                    ⚠️ {error}
                  </div>
                )}

                <motion.div variants={SlideRight(1.0)} initial="hidden" animate="visible">
                  <button
                    type="submit"
                    className="w-full flex justify-center items-center gap-2 p-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 font-bold rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all shadow-md"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-blue-800 border-t-transparent rounded-full animate-spin" />
                    ) : step === 1 ? (
                      <>
                        <FaPlus className="text-blue-800" />
                        Send Link Request
                      </>
                    ) : (
                      <>
                        <FaChild className="text-blue-800" />
                        Verify and Link
                      </>
                    )}
                  </button>
                </motion.div>

                <motion.div variants={SlideRight(1.1)} initial="hidden" animate="visible">
                    <Link to={"/parent/children"}>
                  <button
                    type="button"
                    className="text-blue-700 underline hover:text-yellow-600"
                    onClick={() => setShowAddForm(false)}
                    >
                    ← Back to Children List
                  </button>
                      </Link>
                </motion.div>
              </div>
            </form>
          ) : (
            <motion.div variants={SlideRight(0.8)} initial="hidden" animate="visible">
              <button
                onClick={() => setShowAddForm(true)}
                className="primary-btn flex items-center gap-2 p-3 bg-blue-600 text-yellow-400 rounded-lg hover:bg-blue-700 transition-all shadow-lg"
              >
                <FaPlus className="text-xl" />
                Add New Child
              </button>
            </motion.div>
          )}

          {/* Stats Card */}
          {/* <motion.div 
            variants={SlideRight(1.2)} 
            initial="hidden" 
            animate="visible"
            className="mt-8 p-4 bg-white rounded-xl border-2 border-blue-100 shadow-sm"
          >
            <h4 className="text-lg font-bold text-blue-800 mb-2">Family Stats</h4>
            <div className="flex justify-between">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-500">{user?.children?.length || 0}</div>
                <div className="text-sm text-blue-600">Linked Children</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-500">0</div>
                <div className="text-sm text-blue-600">Active Sessions</div>
              </div>
            </div>
          </motion.div> */}
        </div>
      </div>
    </div>
  );
};

export default MyChildren;