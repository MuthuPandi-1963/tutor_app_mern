import express from 'express';
import { getChildrenActivities, requestStudentLink, verifyStudentOTP } from '../controller/parent.controller.js';


const parentRoutes = express.Router();

parentRoutes.post('/link-request', requestStudentLink);       // Parent starts link process
parentRoutes.post('/link-verify', verifyStudentOTP);          // Student verifies OTP
parentRoutes.get('/children/:parentId', getChildrenActivities); // Parent gets student data

export default parentRoutes;
