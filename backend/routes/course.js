import express from "express";
import authMiddleware from '../middleware/middleware.js';
import dotenv from 'dotenv';
import Course from "../models/Course.js";
import User from "../models/User.js";
dotenv.config();

const router = express.Router()


router.post('/create', authMiddleware, async (req, res) => {
    try {
        let { title, subtitle, description, category, price, whatsLearned, language, thumbnail } = req.body;

        if (!req.user.isTutor) {
            return res.status(403).json({ success: false, message: "Student can not create course." })
        }

        const course = await Course.create({
            title,
            subtitle,
            tutorId: req.user.id,
            tutor: req.user.name,
            description,
            category,
            price,
            whatsLearned,
            language,
            thumbnail
        })
        return res.status(200).json({ success: true, message: "Course added successfully.", details: course })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
});


router.get('/view-all', async (req, res) => {
    try {

        const courses = await Course.find()

        return res.status(200).json({ success: true, message: "Course fetched successfully.", courses: courses })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
});



export default router