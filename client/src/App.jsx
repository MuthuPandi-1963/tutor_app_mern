import React, { useEffect } from "react";

import Register from "./pages/auth/Register";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import HomeLayout from "./components/Home/HomeLayout";
import Login from "./pages/auth/Login";
import { useDispatch, useSelector } from "react-redux";
import RefreshAuthThunk from "./store/Thunks/Auth/RefreshAuthThunk";
import EditProfile from "./pages/tutor/EditProfile";
import TutorLayout from "./pages/tutor/TutorLayout";
import TutorDashboard from "./pages/tutor/TutorDashBoard";
import TutorStudents from "./pages/tutor/TutorStudents";
import TutorEarnings from "./pages/tutor/TutorEarnings";
import TutorBookings from "./pages/tutor/TutorBookings";
import SubjectsList from "./pages/subjects/Subjects";
import StudentLayout from "./pages/student/StudentLayout";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentClasses from "./pages/student/StduentClasses";
import StudentReviews from "./pages/student/StudentReviews";
import StudentProfile from "./pages/student/StudentProfile";
import TutorList from "./pages/student/GetAllTutors";
import AboutUs from "./components/About";
import ContactPage from "./components/ContactUs";
import Booking from "./pages/student/Booking";

const App = () => {
  const userData = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log(userData.data);
  useEffect(() => {
    dispatch(RefreshAuthThunk());
  }, []);
  function handleClick() {
    console.log(done);
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route path="" element={<Home />} />
          <Route path="subjects" element={<SubjectsList />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="about" element={<AboutUs/>}/>
          <Route path="contact" element={<ContactPage/>}/>
          {/* <Route path="profile" element={<TutorProfile/>} /> */}
          {/* <Route path="profile" element={<StudentProfile/>} /> */}
          {/* <Route path="profile" element={<ParentProfile/>} /> */}

          <Route path="/tutor" element={<TutorLayout />}>
            <Route index element={<TutorDashboard />} />
            <Route path="edit-profile" element={<EditProfile />} />
            <Route path="students" element={<TutorStudents />} />
            <Route path="bookings" element={<TutorBookings />} />
            <Route path="earnings" element={<TutorEarnings />} />
          </Route>
          <Route path="tutors" element={<TutorList />} />
          <Route path="/student" element={<StudentLayout />}>
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="classes" element={<StudentClasses />} />
            <Route path="reviews" element={<StudentReviews />} />
            <Route path="profile" element={<StudentProfile />} />
            <Route path="bookings/:id" element={<Booking/>}/>
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
