import express from 'express'
import { register, verifyOTP, login } from '../controllers/auth'

const router = express.Router();

router.route('/api/auth/register')
    .post(register)
router.route('/api/auth/verifyOTP')
    .post(verifyOTP)
router.route('/api/auth/login')
    .post(login)
export default router