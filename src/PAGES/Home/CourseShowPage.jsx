import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { get, ref, remove } from 'firebase/database'; 
import db from '../../../firebase';
import 'animate.css'; 

const CourseShowPage = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null); 
    const [userId] = useState('user1'); 
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchData = async () => {
            const dbRef = ref(db, `CoursesList/${id}`); 
            const snapshot = await get(dbRef);
            if (snapshot.exists()) {
                console.log('Course data fetched:', snapshot.val()); 
                setCourse(snapshot.val());
            } else {
                console.log("No such course found!");
            }
        };

        fetchData();
    }, [id]);

    const handleUnenroll = async () => {
        try {
            const unenrollRef = ref(db, `CoursesList/${id}/enrolledUsers/${userId}`);
            await remove(unenrollRef); 
            alert('Successfully unenrolled from the course!');
            navigate(`/CourseDetails/${id}`);
        } catch (error) {
            console.error("Error unenrolling from course: ", error);
            alert('Error unenrolling. Please try again.');
        }
    };

    if (!course) {
        return <p className="text-center mt-5 mb-5">Loading...</p>;
    }

    return (
        <div className="container mb-5">
            <h3 className="mt-5 mb-5">Course: {course?.title}</h3>
            <div className="row justify-content-center">
                <div className="col-lg-12 border p-3 shadow-lg rounded animate__animated animate__fadeIn">
                    <img 
                        src={course?.imageUrl} 
                        height={500} 
                        className="card-img-top shadow-lg rounded" 
                        alt={course?.title} 
                    />
                    <div className="card-body">
                        <h6 className="card-title">{course.title}</h6>
                        <p className="card-text"><b>Instructor</b>: {course.instructor}</p>
                        <p className="card-text"><b>Difficulty</b>: {course?.difficulty}</p>
                        <p className="card-text"><b>Price</b>: ${course?.price}</p>
                        <p className="card-text"><b>Rating</b>: {course?.rating} / 5</p>
                        <p className="card-text">{course?.description}</p>
                    </div>

                    <div className="unenroll-section mt-4">
                        <h5>Unenroll from this Course</h5>
                        <button onClick={handleUnenroll} className="btn btn-danger mb-3">Unenroll</button>
                    </div>

                   

                    {/* Display the video if it's available */}
                    {course?.videoUrl && (
                        <div className="video-section mt-5">
                            <h5>Watch the Course Lecture</h5>
                            <video width="100%" height="400" controls>
                                <source src={course.videoUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CourseShowPage;
