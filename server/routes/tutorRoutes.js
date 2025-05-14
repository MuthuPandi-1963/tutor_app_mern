import {Router} from "express";
import { createTutorProfile } from "../controller/TutorController/CreateProfile.js";
import { getTutorProfile } from "../controller/TutorController/Getprofile.js";
import GetTutor from "../controller/TutorController/GetTutor.js";
import { updateTutorProfile } from "../controller/TutorController/UpdateProfile.js";
import getStudentsByTutor from "../controller/TutorController/GetStudentsBytutor.js";

const tutorRoutes = Router();

tutorRoutes.put("/profile/:id", updateTutorProfile);
tutorRoutes.get("/profile/:id", getTutorProfile);
tutorRoutes.get("/get_all_tutors",GetTutor)
tutorRoutes.get("/:tutorId/students",getStudentsByTutor)

export default tutorRoutes;
