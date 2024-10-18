import  { useState } from 'react';
import { useCourses } from '../../context/CoursesContext'; 
import { Link } from 'react-router-dom';
import 'animate.css';

const CoursesList = () => {
    const { courses, handleDelete } = useCourses(); 
    const [searchTerm, setSearchTerm] = useState(''); 

    // Filter courses based on search term
    const filteredCourses = courses.filter(course => {
        const title = course.title || '';
        const author = course.author || '';
        return title.toLowerCase().includes(searchTerm.toLowerCase()) ||
               author.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className="container">
            <div className="row d-flex justify-content-center mt-4">
                <div className="col-md-8">
                    <input
                        type="text"
                        className="form-control shadow-lg p-3 mb-5 bg-light rounded"
                        placeholder="Search courses by title or instructor..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="row">
                {filteredCourses.map((course) => (
                    <div key={course.id} className="col-md-3 mb-5">
                        <div className="card h-100 shadow-lg border-0 animated animate__fadeIn interactive-card">
                            <img 
                                src={course.imageUrl} 
                                className="card-img-top" 
                                alt={course.title} 
                                style={{ height: '200px', objectFit: 'cover' }} 
                            />
                            <div className="card-body">
                                <h5 className="card-title text-primary">{course.title}</h5>
                                <p className="card-text">
                                    <strong>Instructor:</strong> {course.author}<br />
                                    <strong>Rating:</strong> {course.rating} / 5<br />
                                    <strong>Price:</strong> ${course.price}<br />
                                    <strong>Difficulty:</strong> {course.difficulty}<br />
                                    <strong>Category:</strong> {course.category}<br />
                                    <strong>Publication Date:</strong> {new Date(course.publicationDate).toLocaleDateString()}<br />
                                </p>
                                <div className="d-flex justify-content-between">
                                    <Link to={`/CourseDetails/${course.id}`} className="btn btn-primary">Show More</Link>
                                    
                                    <button 
                                        onClick={() => handleDelete(course.id)} 
                                        className="btn btn-danger ms-2"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {filteredCourses.length === 0 && (
                    <div className="text-center fs-1 mt-5 text-danger mb-5">
                        <h5>No courses found.</h5>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CoursesList;
