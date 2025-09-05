import React from 'react'
import { useParams } from 'react-router-dom'

function CourseDetails() {
    const { courseId } = useParams()
    console.log(courseId)
    return (
        <div>CourseDetails</div>
    )
}

export default CourseDetails