// context/CoursesContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ref, onValue, remove } from 'firebase/database'; // Firebase methods
import db from '../../firebase'; // Adjust the path based on your project structure

const CoursesContext = createContext();

export const CoursesProvider = ({ children }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const coursesRef = ref(db, 'CoursesList');
        const unsubscribe = onValue(coursesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const courseList = Object.keys(data).map(key => ({ id: key, ...data[key] }));
                setCourses(courseList);
            } else {
                setCourses([]);
            }
            setLoading(false); // Set loading to false after data is fetched
        }, (error) => {
            console.error("Error fetching courses: ", error);
            setLoading(false); // Handle loading state on error
        });

        return () => unsubscribe(); // Cleanup on unmount
    }, []);

    // Handle delete course
    const handleDelete = async (id) => {
        try {
            const courseRef = ref(db, `CoursesList/${id}`); // Firebase path to the course
            await remove(courseRef); // Remove the course from Firebase
            setCourses((prevCourses) => prevCourses.filter(course => course.id !== id)); // Update local state
            console.log(`Course with ID ${id} deleted successfully.`);
        } catch (error) {
            console.error("Error deleting course: ", error);
        }
    };

    return (
        <CoursesContext.Provider value={{ courses, loading, handleDelete }}>
            {children}
        </CoursesContext.Provider>
    );
};

export const useCourses = () => useContext(CoursesContext);
