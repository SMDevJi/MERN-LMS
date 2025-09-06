import express from "express";
import authMiddleware from '../middleware/middleware.js';
import dotenv from 'dotenv';
import Course from "../models/Course.js";
import User from "../models/User.js";
import { deleteFile } from "../utils/cloudinary.js";
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



router.put('/update', authMiddleware, async (req, res) => {
    try {
        let { courseId, title, subtitle, description, category, price, whatsLearned, language, thumbnail } = req.body;

        if (!req.user.isTutor) {
            return res.status(403).json({ success: false, message: "Student can not create course." })
        }

        const oldCourse = await Course.findById(courseId)
        if (req.user.id != oldCourse.tutorId) {
            return res.status(403).json({ success: false, message: "You don't have permission to update this course." })
        }

        const updatedCourse = await Course.findByIdAndUpdate(courseId, {
            title,
            subtitle,
            description,
            category,
            price,
            whatsLearned,
            language,
            thumbnail
        }, { new: true })

        await deleteFile(oldCourse.thumbnail)
        return res.status(200).json({ success: true, message: "Course updated successfully.", updatedCourse })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
});





router.post('/lectures/add', authMiddleware, async (req, res) => {
    const { courseId, title, url, isFree } = req.body;

    if (!title || !url) {
        return res.status(400).json({ error: 'Title and URL are required.' });
    }

    try {
        let course;
        try {
            course = await Course.findById(courseId);
        } catch (error) {
            return res.status(404).json({ error: 'Course not found.' });
        }

        if (req.user.id != course.tutorId) {
            return res.status(403).json({ success: false, message: "You don't have permission to update this course." })
        }
        const newLecture = {
            title,
            url,
            isFree,
            order: course.lectures.length + 1
        };

        course.lectures.push(newLecture);

        await course.save();

        res.status(200).json({ success: true, message: 'Lecture added successfully.', lecture: newLecture, lectures: course.lectures });
    } catch (err) {
        console.error('Error adding lecture:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});






router.delete('/lectures/delete', authMiddleware, async (req, res) => {
    const { lectureId } = req.body;

    if (!lectureId) {
        return res.status(400).json({ error: 'Lecture id is required.' });
    }

    try {
        const course = await Course.findOne({ 'lectures._id': lectureId });

        if (!course) {
            return res.status(404).json({ success: false, message: 'Lecture not found.' });
        }

        if (req.user.id != course.tutorId.toString()) {
            return res.status(403).json({ success: false, message: "You don't have permission to delete this lecture." });
        }

        const lectureToDelete = course.lectures.find(
            (lecture) => lecture._id.toString() === lectureId
        );

        if (lectureToDelete?.url) {
            try {
                await deleteFile(lectureToDelete.url);
            } catch (err) {
                console.error('Failed to delete video file:', err);
            }
        }

        course.lectures = course.lectures.filter(
            (lecture) => lecture._id.toString() !== lectureId
        );

       
        course.lectures.forEach((lecture, index) => {
            lecture.order = index + 1;
        });

        await course.save();

        res.status(200).json({ success: true, message: 'Lecture deleted successfully.', course });
    } catch (error) {
        console.error('Error deleting lecture:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});







router.put('/lectures/update', authMiddleware, async (req, res) => {
    const { lectureId, title, isFree } = req.body;

    if (!lectureId) {
        return res.status(400).json({ success: false, message: 'Lecture id is required.' });
    }

    try {
        let course;
        try {
            course = await Course.findOne({ 'lectures._id': lectureId });
        } catch (error) {
            return res.status(404).json({ success: false, message: 'Lecture not found.' });
        }

        if (req.user.id !== course.tutorId.toString()) {
            return res.status(403).json({ success: false, message: "You don't have permission to update this lecture." });
        }

        let lecture;
        try {
            lecture = course.lectures.id(lectureId);
        } catch (error) {
            return res.status(404).json({ success: false, message: 'Lecture not found.' });
        }


        
        lecture.title = title;
        lecture.isFree = isFree;

        await course.save();

        return res.status(200).json({ success: true, message: 'Lecture updated successfully.', lecture });
    } catch (error) {
        console.error('Error updating lecture:', error);
        return res.status(500).json({ success: false, message: 'Internal server error.' });
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



router.get('/get-course', async (req, res) => {
    try {

        let courseId = req.query.courseId;
        //console.log(courseId)
        let course;
        try {
            course = await Course.findById(courseId)
        } catch (error) {
            return res.status(404).json({ success: false, message: "Course not found." })
        }


        return res.status(200).json({ success: true, message: "Course fetched successfully.", course: course })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
});



export default router