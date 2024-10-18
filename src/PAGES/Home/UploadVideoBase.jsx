import React, { useState } from 'react';
import { ref as dbRef, set } from 'firebase/database';
import  db  from '../../../firebase'; // Ensure to import your initialized Firebase app

const UploadVideoBase = ({ bookId }) => {
    const [videoFile, setVideoFile] = useState(null);
    const [error, setError] = useState('');

    const handleFileChange = (event) => {
        setVideoFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!videoFile) {
            alert('Please select a video file to upload.');
            return;
        }

        // Check file size (limit to 1MB)
        if (videoFile.size > 10 * 1024 * 1024) {
            setError('File size should be less than 1MB.');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64String = reader.result;
            console.log('Base64 Video:', base64String);

            // Save the base64 string to Firebase Realtime Database
            const bookRef = dbRef(db, `BooksList/${bookId}`);
            await set(bookRef, { videoUrl: base64String });
            alert('Video uploaded successfully!');
        };

        reader.onerror = (error) => {
            console.error('Error converting video to base64:', error);
            setError('Failed to convert video to base64.');
        };

        reader.readAsDataURL(videoFile); // Converts video file to base64
    };

    return (
        <div>
            <input type="file" accept="video/*" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload Video</button>
            {error && <p className="text-danger">{error}</p>}
        </div>
    );
};

export default UploadVideoBase;
