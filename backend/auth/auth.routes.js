import express from 'express';
import { verifyFirebaseUser } from './auth.controller.js';
import { sendRegistrationOtp, verifyOtpAndRegister, login } from './emailAuth.controller.js';

const router = express.Router();

router.post('/google', verifyFirebaseUser);

router.post('/send-otp', sendRegistrationOtp);
router.post('/verify-otp', verifyOtpAndRegister);

router.post('/login', login);

export default router;