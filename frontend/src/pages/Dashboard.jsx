import React, { useState, useEffect } from 'react'
import Loading from '../components/Loading';
import axios from 'axios';
import Course from '@/components/Course';

function Dashboard() {
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true);
        const options = { method: 'GET', url: `${import.meta.env.VITE_BACKEND_URL}/api/course/view-all` };

        axios.request(options).then(function (response) {
            console.log(response.data);
            let fetchedCourses = response.data.courses;
            // let courseArray = fetchedCourses.map(course => ({
            //     id: course._id,
            //     title: course.title,
            //     tutor: course.tutor,
            //     image: course.thumbnail
            // }));

            setCourses(fetchedCourses);
        }).catch(function (error) {
            console.error(error);
            toast.error('Failed to load courses!');
        }).finally(function () {
            setLoading(false);
        });
    }, []);



    return (
        <div className='courses-wrapper min-h-[70vh]'>
            <div className="courses-section mt-10 p-4">
                <h1 className='text-xl font-semibold mb-3'>Your Courses</h1>
                <div className="courses w-full">
                    {loading ? <Loading /> :

                        courses.map(course =>
                            <Course key={course._id} product={course} />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Dashboard