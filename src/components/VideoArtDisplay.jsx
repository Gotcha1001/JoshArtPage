import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseconfig/firebase';
import VideoEmbed from './VideoEmbeded';
import Spinner from './Spinner';
import Pagination from './Pagination'; // Assuming you have a Pagination component

const VideoArtDisplay = () => {
    const [videos, setVideos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [videosPerPage] = useState(5); // Number of videos per page
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'art-video'));
                const videoList = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    let date;
                    if (data.date && data.date.toDate) {
                        date = data.date.toDate();
                    } else if (data.date) {
                        date = new Date(data.date * 1000);
                    }
                    return {
                        id: doc.id,
                        ...data,
                        date
                    };
                });

                // Sort videoList by date in descending order (most recent first)
                videoList.sort((a, b) => b.date - a.date);

                setVideos(videoList);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching videos:', err);
                setError('Failed to load videos.');
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    // Get current videos for pagination
    const indexOfLastVideo = currentPage * videosPerPage;
    const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
    const currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const nextPage = () => {
        setCurrentPage((prevPage) => {
            const next = Math.min(prevPage + 1, Math.ceil(videos.length / videosPerPage));
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 100); // Adjust delay time as needed (e.g., 100ms)
            return next;
        });
    };
    const prevPage = () => {
        setCurrentPage((prevPage) => {
            const prev = Math.max(prevPage - 1, 1);
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 100); // Adjust delay time as needed (e.g., 100ms)
            return prev;
        });
    };

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-black to-white p-4">
            <h1 className="text-4xl font-bold text-white mb-8 text-center hover:bg-teal-600 rounded-md">Joshes Art Videos & Tutorials</h1>
            {currentVideos.map((video) => (
                <div
                    key={video.id}
                    className="card-content mb-8 gradient- p-4 rounded-lg mx-auto w-full lg:w-2/3 zoom gradient-background1"
                >
                    <h2 className="text-2xl font-bold text-white">{video.title}</h2>
                    <p className="text-lg text-gray-300 mb-1">Art By: {video.artBy}</p>
                    <p className="text-lg text-gray-300 mb-1">Date: {formatDate(video.date)}</p>
                    <div className="w-full max-w-full overflow-hidden rounded-lg mx-auto">
                        <VideoEmbed videoUrl={video.videoUrl} />
                    </div>
                    <p className="text-gray-300 mt-4">Content: {video.content}</p>
                </div>
            ))}
            <Pagination
                postsPerPage={videosPerPage}
                totalPosts={videos.length}
                currentPage={currentPage}
                nextPage={nextPage}
                prevPage={prevPage}
            />
        </div>
    );
};

// Helper function to format date as "day, month, year"
const formatDate = (date) => {
    if (!date) return ''; // Handle case where date is null or undefined
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date instanceof Date ? date.toLocaleDateString(undefined, options) : ''; // Format Date object
};

export default VideoArtDisplay;
