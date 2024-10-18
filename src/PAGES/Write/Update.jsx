import  { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ref, set, get } from 'firebase/database';
import db from '../../../firebase'; 

const UpdateCourse = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [courseData, setCourseData] = useState({
        title: '',
        author: '',
        rating: 0,
        price: 0,
        difficulty: '',
        category: '',
        imageUrl: '',
        publicationDate: ''
    });

    // Fetch the course data based on the ID
    useEffect(() => {
        const courseRef = ref(db, `CoursesList/${id}`);
        get(courseRef).then((snapshot) => {
            if (snapshot.exists()) {
                setCourseData(snapshot.val());
            } else {
                console.log("No course data available.");
            }
        }).catch((error) => {
            console.error("Error fetching course data: ", error);
        });
    }, [id]);

    // Handle form submission to update the course
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const courseRef = ref(db, `CoursesList/${id}`);
            await set(courseRef, courseData); 
            console.log("Course updated successfully.");
            navigate('/'); 
        } catch (error) {
            console.error("Error updating course: ", error);
        }
    };

    return (
        <div className="container">
            <h2 className="mt-5">Update Course</h2>
            <form onSubmit={handleUpdate}>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={courseData.title}
                        onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Author</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={courseData.author}
                        onChange={(e) => setCourseData({ ...courseData, author: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Rating</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        value={courseData.rating}
                        onChange={(e) => setCourseData({ ...courseData, rating: Number(e.target.value) })}
                        min="0" 
                        max="5" 
                        step="0.1"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        value={courseData.price}
                        onChange={(e) => setCourseData({ ...courseData, price: Number(e.target.value) })}
                        min="0" 
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Difficulty</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={courseData.difficulty}
                        onChange={(e) => setCourseData({ ...courseData, difficulty: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Category</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={courseData.category}
                        onChange={(e) => setCourseData({ ...courseData, category: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Image URL</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={courseData.imageUrl}
                        onChange={(e) => setCourseData({ ...courseData, imageUrl: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Publication Date</label>
                    <input 
                        type="date" 
                        className="form-control" 
                        value={courseData.publicationDate}
                        onChange={(e) => setCourseData({ ...courseData, publicationDate: e.target.value })}
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3">Update Course</button>
            </form>
        </div>
    );
};

export default UpdateCourse;
