import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../firebaseconfig/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';

const UploadVideoForm = ({ onVideoUploaded }) => {
    const [title, setTitle] = useState('');
    const [artBy, setArtBy] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserName(user.displayName || user.email);
            } else {
                setUserName('');
            }
        });

        return () => unsubscribe();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const canEmbed = await checkEmbedPermission(videoUrl);

        try {
            await addDoc(collection(db, 'art-video'), {
                title,
                artBy,
                videoUrl,
                content,
                date: Timestamp.fromDate(new Date()), // Use current date as Timestamp
                userName,
                embeddable: canEmbed
            });

            setTitle('');
            setArtBy('');
            setVideoUrl('');
            setContent('');
            setError(null);

            // Notify parent component that a new video has been uploaded
            alert('Video uploaded successfully!');

            // Redirect to the facebook-live page
            navigate('/art-videos');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const checkEmbedPermission = async (url) => {
        return new Promise((resolve) => {
            const iframe = document.createElement('iframe');
            iframe.src = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&width=734`;
            iframe.style.display = 'none';
            document.body.appendChild(iframe);

            iframe.onload = () => {
                resolve(true);
                document.body.removeChild(iframe);
            };

            iframe.onerror = () => {
                resolve(false);
                document.body.removeChild(iframe);
            };
        });
    };

    const handleCancel = () => {
        // Implement cancellation logic here, if needed
        navigate('/art-videos'); // Redirect to facebook-live page on cancel
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg mx-auto gradient-background1 mt-4 mb-3">
            <h2 className="text-2xl font-bold mb-4 text-white">Upload Video</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="mb-4">
                <label className="block  font-semibold mb-2 text-white">Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="mb-4">
                <label className="block  font-semibold mb-2 text-white">Art By:</label>
                <input
                    type="text"
                    value={artBy}
                    onChange={(e) => setArtBy(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="mb-4">
                <label className="block  font-semibold mb-2 text-white">Video URL:</label>
                <input
                    type="text"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="mb-4">
                <label className="block  font-semibold mb-2 text-white">Content:</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-40 resize-none whitespace-pre-wrap"
                ></textarea>
            </div>
            <div className="flex justify-between">
                <button
                    type="button"
                    onClick={handleCancel}
                    className="py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-300"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                >
                    {loading ? 'Uploading...' : 'Upload'}
                </button>
            </div>
        </form>
    );
};

export default UploadVideoForm;
