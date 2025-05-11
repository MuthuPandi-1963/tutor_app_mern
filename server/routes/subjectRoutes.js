import {Router} from "express";
import CreateSubjects from "../controller/SubjectController/CreateSubjects.js";
import GetSubjects from "../controller/SubjectController/GetSubjects.js";
import UpdateSubject from "../controller/SubjectController/updateSubjects.js";


const subjectRoutes = Router();

subjectRoutes.post("/subjects", CreateSubjects);
subjectRoutes.get("/subjects", GetSubjects);
subjectRoutes.put("/subjects/:id", UpdateSubject);

export default subjectRoutes;
