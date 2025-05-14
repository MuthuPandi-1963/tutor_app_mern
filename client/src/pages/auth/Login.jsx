import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { SlideRight } from "../../utility/animation";
import HeroImg from "../../assets/hero.png";
import LoginThunk from "../../store/Thunks/Auth/LoginThunk";
import { useDispatch } from "react-redux";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await dispatch(LoginThunk(formData))
      // Set cookie with token
      document.cookie = response?.payload?.token;
      
      if(response?.payload?.success){
        navigate("/");
      }
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
      {/* Login Form */}
      <div className="flex flex-col justify-center py-14 md:pr-16 xl:pr-40 md:py-0">
        <div className="text-center md:text-left space-y-6">
          <motion.h1
            variants={SlideRight(0.6)}
            initial="hidden"
            animate="visible"
            className="text-4xl font-semibold lg:text-5xl !leading-tight"
          >
            Welcome Back
          </motion.h1>

          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              <motion.div variants={SlideRight(0.8)} initial="hidden" animate="visible">
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

              <motion.div variants={SlideRight(0.9)} initial="hidden" animate="visible">
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

              {error && (
                <motion.div variants={SlideRight(1.0)} initial="hidden" animate="visible">
                  <p className="text-red-500">{error}</p>
                </motion.div>
              )}

              <motion.div variants={SlideRight(1.1)} initial="hidden" animate="visible">
                <button
                  type="submit"
                  className="primary-btn w-full flex justify-center items-center gap-2"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    "Login"
                  )}
                </button>
              </motion.div>
            </div>
          </form>

          <motion.div variants={SlideRight(1.2)} initial="hidden" animate="visible" className="flex flex-col gap-3">
            <button
              className="text-primary font-semibold text-sm"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </button>
            
            <p className="text-gray-600">
              Don't have an account?{" "}
              <button
                className="text-primary font-semibold"
                onClick={() => navigate("/register")}
              >
                Create account
              </button>
            </p>
          </motion.div>
        </div>
      </div>

      
    </div>
  );
};

export default Login;