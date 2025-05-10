import {Router} from 'express'
import { register } from '../controller/AuthController/register.js'
import { verifyOTP } from '../controller/AuthController/verifyOTP.js'
import { login } from '../controller/AuthController/login.js'
import { resendOTP } from '../controller/AuthController/resendOTP.js'
import { logout } from '../controller/AuthController/logout.js'

const AuthRoutes = Router()


AuthRoutes.post("/register",register)
AuthRoutes.post("/verify_otp",verifyOTP)
AuthRoutes.post("/login",login)
AuthRoutes.post("/resend_otp",resendOTP)

AuthRoutes.get("/logout",logout)

export default AuthRoutes;