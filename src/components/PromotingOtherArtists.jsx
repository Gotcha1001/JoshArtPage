import React, { useEffect, useState } from 'react';
import { db } from '../firebaseconfig/firebase';
import { collection, query, getDocs, doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';

export default function PromoteOtherArtists() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const q = query(collection(db, 'promote-others'));
                const querySnapshot = await getDocs(q);
                let postsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    date: new Date(doc.data().date.seconds * 1000)
                }));

                postsData.sort((a, b) => b.date - a.date);

                setPosts(postsData);
                setLoading(false);
                console.log('Posts fetched successfully:', postsData);
            } catch (err) {
                console.error('Error fetching posts:', err);
                setError('Failed to load posts.');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const handleLike = async (postId, currentLikes) => {
        try {
            const postRef = doc(db, 'promote-others', postId);
            const newLikes = Number(currentLikes) + 1;

            await updateDoc(postRef, {
                likes: newLikes
            });

            setPosts(prevPosts =>
                prevPosts.map(post =>
                    post.id === postId ? { ...post, likes: newLikes } : post
                )
            );
        } catch (err) {
            console.error('Error updating likes:', err);
        }
    };

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const nextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(posts.length / postsPerPage)));
    };

    const prevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-black to-white p-4">
            <h1 className="text-4xl font-bold text-white my-8 mt-16 zoom">Other Inspiring Artists</h1>
            <div className="daily-posts-list w-full max-w-2xl mt-1">
                {currentPosts.length > 0 ? (
                    currentPosts.map((post, index) => (
                        <div
                            key={index}
                            className="daily-post-item mb-4 p-6 gradient-background1 rounded-lg shadow-lg transition transform hover:scale-105"
                        >
                            <p className="text-2xl font-bold mb-2 text-white">
                                Date Posted: {post.date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </p>
                            {post.imgUrl && (
                                <div className="w-full h-96 mb-4 rounded overflow-hidden flex justify-center items-center">
                                    <img src={post.imgUrl} alt="Post Image" className="w-full h-full object-contain transition transform hover:wobble" />
                                </div>
                            )}
                            <p className="text-gray-200 mb-4">Title: {post.title}</p>
                            <p className="text-gray-200 mb-4">Inspiration Quote: {post.inspirationQuote}</p>
                            <p className="text-gray-200 text-sm mb-2">Artist Name: {post.artistName}</p>
                            <div className="flex items-center">
                                <p className="text-gray-200 text-sm mr-2">Likes: {post.likes}</p>
                                <button
                                    onClick={() => handleLike(post.id, post.likes)}
                                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700 transition"
                                >
                                    Like
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-white">No posts available</p>
                )}
            </div>
            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={posts.length}
                paginate={paginate}
                currentPage={currentPage}
                nextPage={nextPage}
                prevPage={prevPage}
            />
        </div>
    );
}

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage, nextPage, prevPage }) => {
    return (
        <nav>
            <ul className="flex justify-center mt-4">
                <li>
                    <button
                        onClick={prevPage}
                        className={`page-link mx-2 px-4 py-2 rounded shadow-md border border-teal-500 ${currentPage === 1 ? 'cursor-not-allowed text-gray-500' : 'text-teal-500 hover:text-white hover:bg-teal-500 transition transform hover:translate-y-1 hover:shadow-lg'}`}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => paginate(currentPage)}
                        className={`page-link px-4 py-2 rounded shadow-md border border-teal-500 ${currentPage === 1 ? 'bg-teal-500 text-white' : 'text-teal-500 hover:text-white hover:bg-teal-500 transition transform hover:translate-y-1 hover:shadow-lg'}`}
                    >
                        {currentPage}
                    </button>
                </li>
                <li>
                    <button
                        onClick={nextPage}
                        className={`page-link mx-2 px-4 py-2 rounded shadow-md border border-teal-500 ${currentPage === Math.ceil(totalPosts / postsPerPage) ? 'cursor-not-allowed text-gray-500' : 'text-teal-500 hover:text-white hover:bg-teal-500 transition transform hover:translate-y-1 hover:shadow-lg'}`}
                        disabled={currentPage === Math.ceil(totalPosts / postsPerPage)}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
};
