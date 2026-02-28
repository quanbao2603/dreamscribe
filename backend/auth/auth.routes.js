import express from 'express';
import { verifyFirebaseUser } from './auth.controller.js';

const router = express.Router();

router.post('/google', verifyFirebaseUser);

export default router;