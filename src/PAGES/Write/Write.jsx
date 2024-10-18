import { push, ref, set } from 'firebase/database';
import { useForm } from 'react-hook-form';
import db from '../../../firebase';
import { useNavigate } from 'react-router-dom';
import 'animate.css';
import { useState } from 'react';

const Write = () => {
    const { register, handleSubmit, reset, setValue } = useForm();
    const navigate = useNavigate();
    const [isPdfVisible, setIsPdfVisible] = useState(false);
    const [isVideoVisible, setIsVideoVisible] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setValue('imageUrl', reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePdfChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setValue('pdfUrl', reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleVideoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setValue('videoUrl', reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = (data) => {
        const formattedData = {
            ...data,
            uploadedAt: new Date().toLocaleString(),
        };

        const newDocRef = push(ref(db, "CoursesList")); 
        set(newDocRef, formattedData)
            .then(() => {
                alert("Course added successfully");
                reset();
                navigate("/"); 
            })
            .catch((error) => {
                alert("Error: " + error.message);
            });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="animate__animated animate__fadeIn">
            <h4 className='mb-4 mt-3 text-center'>Add Your Course</h4>
            <div className="container">
                <div className="row d-flex mx-auto justify-content-center">
                    <div className="col-lg-10 mx-auto mt-3 mb-2">
                        <input type="text" className='form-control shadow py-3 border-primary' {...register('title')} autoFocus placeholder='Course Title' />
                    </div>
                    <div className="col-lg-10 mt-3">
                        <input type="text" className='form-control shadow py-3 border-primary' {...register('instructor')} placeholder='Instructor Name' />
                    </div>
                    <div className="col-lg-10 mt-3">
                        <input type="text" className='form-control shadow py-3 border-primary' {...register('category')} placeholder='Course Category' />
                    </div>

                 
                    <div className="col-lg-10 mt-3">
                        <input type="text" className='form-control shadow py-3 border-primary' {...register('author')} placeholder='Course Author' />
                    </div>

                    <div className="col-lg-10 mt-3">
                        <select className='form-select shadow py-3 border-primary' {...register('difficulty')}>
                            <option value="" disabled selected>Select Difficulty Level</option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>
                    </div>

                    <div className="col-lg-10 mt-3">
                        <input type="number" className='form-control shadow py-3 border-primary' {...register('price')} placeholder='Price' />
                    </div>

                    
                    <div className="col-lg-10 mt-3">
                        <input type="number" step="0.1" className='form-control shadow py-3 border-primary' {...register('rating')} placeholder='Rating (out of 5)' min="0" max="5" />
                    </div>

                    <div className="col-lg-10 mt-3">
                        <textarea className="form-control shadow py-3 border-primary" {...register('description')} rows="8" placeholder="Describe the course here..."></textarea>
                    </div>

                    <div className="col-lg-10 mt-3">
                        <label htmlFor="dateInput" className="form-label" style={{ color: '#365E32' }}>Publication Date</label>
                        <input type="date" className='form-control py-3 shadow border-primary' {...register('publicationDate')} />
                    </div>

                    <div className="col-lg-10 mt-3">
                        <label htmlFor="imageInput" className="form-label" style={{ color: '#365E32' }}>Upload Course Image</label>
                        <input type="file" className='form-control py-3 shadow border-primary' id="imageInput" onChange={handleFileChange} />
                    </div>

                    
                    <div className="col-lg-10 mt-3">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setIsPdfVisible(!isPdfVisible)}
                        >
                            {isPdfVisible ? "Hide PDF Upload" : "Add PDF Upload"}
                        </button>
                    </div>

                    
                    {isPdfVisible && (
                        <div className="col-lg-10 mt-3">
                            <label htmlFor="pdfInput" className="form-label" style={{ color: '#365E32' }}>Upload PDF</label>
                            <input type="file" className='form-control py-3 shadow border-primary' id="pdfInput" accept=".pdf" onChange={handlePdfChange} />
                        </div>
                    )}

                    
                    <div className="col-lg-10 mt-3">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setIsVideoVisible(!isVideoVisible)}
                        >
                            {isVideoVisible ? "Hide Video Upload" : "Add Video Upload"}
                        </button>
                    </div>

                   
                    {isVideoVisible && (
                        <div className="col-lg-10 mt-3">
                            <label htmlFor="videoInput" className="form-label" style={{ color: '#365E32' }}>Upload Video</label>
                            <input type="file" className='form-control py-3 shadow border-primary' id="videoInput" accept="video/*" onChange={handleVideoChange} />
                        </div>
                    )}

                    <input type="hidden" {...register('uploadedAt')} value={new Date().toLocaleString()} />
                </div>
            </div>
            <button className='btn btn-primary text-center mx-auto py-2 mb-3 d-grid mx-auto mt-3'>Add Course</button>
        </form>
    );
};

export default Write;
