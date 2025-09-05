import { useState,useEffect } from 'react'
import Hero from '../components/Hero'
import CourseSection from '../components/CourseSection'
import Loading from '@/components/Loading'
import { toast } from 'react-toastify'
import axios from 'axios'

function Home() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setLoading(true);
    const options = { method: 'GET', url: `${import.meta.env.VITE_BACKEND_URL}/api/course/view-all` };

    axios.request(options).then(function (response) {
      console.log(response.data);
      let fetchedCourses = response.data.courses.slice(0, 8);
      let courseArray = fetchedCourses.map(course => ({
        id: course._id,
        title: course.title,
        tutor: course.tutor,
        image: course.thumbnail
      }));

      setCourses(courseArray);
    }).catch(function (error) {
      console.error(error);
      toast.error('Failed to load courses!');
    }).finally(function () {
      setLoading(false);
    });
  }, []);



  return (
    <>
      <Hero />
      {loading ? <Loading /> : <CourseSection courses={courses} isAllPage={false} />}
    </>
  )
}

export default Home