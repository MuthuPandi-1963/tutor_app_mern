    import React, { useState } from "react";
    import HeroImg from "../../assets/hero.png";
    import { FaPlay } from "react-icons/fa";
    import { motion } from "framer-motion";
    import { SlideRight } from "../../utility/animation";
    import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import RegisterThunk from "../../store/Thunks/RegisterThunk";
import VerifyOTPThunk from "../../store/Thunks/VerifyOTPThunk";

    const Register = () => {
        const dispatch = useDispatch()
        const userData = useSelector(state=>state.auth)
    const [step, setStep] = useState(1); // 1 = registration, 2 = OTP verification
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "student",
        otp: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
        const response = await dispatch(RegisterThunk(formData));
        console.log(response);
        
        if(response?.payload?.success){
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
        const response = await dispatch(VerifyOTPThunk({otp:formData.otp || "",email : formData.email}))

        console.log(response);
        
        
        navigate("/");
        } catch (err) {
        setError(err.message);
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="container grid grid-cols-1 md:grid-cols-2 min-h-[650px] relative">
            {/* Hero image */}
        <div className="flex justify-center items-center">
            <motion.img
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 50, delay: 1, duration: 1 }}
            src={HeroImg}
            alt="Tutoring illustration"
            className="w-[350px] md:w-[550px] xl:w-[700px]"
            />
        </div>    
        {/* Registration Form */}
        <div className="flex flex-col justify-center py-14 md:pr-16 xl:pr-40 md:py-0">
            <div className="text-center md:text-left space-y-6">
            <motion.h1
                variants={SlideRight(0.6)}
                initial="hidden"
                animate="visible"
                className="text-5xl font-semibold lg:text-6xl !leading-tight"
            >
                {step === 1 ? "Get Started" : "Verify OTP"}
            </motion.h1>

            <form onSubmit={step === 1 ? handleRegister : handleVerifyOTP}>
                <div className="space-y-4">
                {step === 1 ? (
                    <>
                    <motion.div variants={SlideRight(0.8)} initial="hidden" animate="visible">
                        <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        className="w-full p-3 border rounded-lg"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        />
                    </motion.div>

                    <motion.div variants={SlideRight(0.9)} initial="hidden" animate="visible">
                        <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        className="w-full p-3 border rounded-lg"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        />
                    </motion.div>

                    <motion.div variants={SlideRight(1.0)} initial="hidden" animate="visible">
                        <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full p-3 border rounded-lg"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        />
                    </motion.div>

                    <motion.div variants={SlideRight(1.1)} initial="hidden" animate="visible">
                        <select
                        name="role"
                        className="w-full p-3 border rounded-lg bg-white"
                        value={formData.role}
                        onChange={handleInputChange}
                        >
                        <option value="student">Student</option>
                        <option value="parent">Parent</option>
                        <option value="tutor">Tutor</option>
                        </select>
                    </motion.div>
                    </>
                ) : (
                    <motion.div variants={SlideRight(0.8)} initial="hidden" animate="visible">
                    <input
                        type="text"
                        name="otp"
                        placeholder="Enter OTP"
                        className="w-full p-3 border rounded-lg"
                        value={formData.otp}
                        onChange={handleInputChange}
                        required
                    />
                    <p className="text-sm mt-2 text-gray-600">
                        We've sent a 6-digit code to {formData.email}
                    </p>
                    </motion.div>
                )}

                {error && <p className="text-red-500">{error}</p>}

                <motion.div variants={SlideRight(1.2)} initial="hidden" animate="visible">
                    <button
                    type="submit"
                    className="primary-btn w-full flex justify-center items-center gap-2"
                    disabled={loading}
                    >
                    {loading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : step === 1 ? (
                        "Register Now"
                    ) : (
                        "Verify OTP"
                    )}
                    </button>
                </motion.div>
                </div>
            </form>

            {step === 1 && (
                <motion.p variants={SlideRight(1.3)} initial="hidden" animate="visible" className="text-gray-600">
                Already have an account?{" "}
                <button className="text-primary font-semibold" onClick={() => navigate("/login")}>
                    Login here
                </button>
                </motion.p>
            )}
            </div>
        </div>

        
        </div>
    );
    };

    export default Register;