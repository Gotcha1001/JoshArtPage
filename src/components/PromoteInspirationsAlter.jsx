import React, { useState, useEffect } from 'react';
import { db, Timestamp } from '../firebaseconfig/firebase';
import { collection, query, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import Spinner from './Spinner';
import Pagination from './Pagination';

export default function PromoteInspirationsAlter() {
    const formatDate = (date) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);
    const [selectedPost, setSelectedPost] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const q = query(collection(db, 'promote-others'));
                const querySnapshot = await getDocs(q);
                const postsData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                    date: doc.data().date.toDate()
                }));
                postsData.sort((a, b) => b.date - a.date);
                setPosts(postsData);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching posts:', err);
            }
        };

        fetchPosts();
    }, []);

    const handleUpdateClick = (post) => {
        setSelectedPost(post);
        setIsDialogOpen(true);
    };

    const handleDeleteClick = async (postId) => {
        try {
            await deleteDoc(doc(db, 'promote-others', postId));
            setPosts(posts.filter(post => post.id !== postId));
        } catch (err) {
            console.error('Error deleting post:', err);
        }
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        const { id, date, title, inspirationQuote, artistName, imgUrl, likes } = selectedPost;
        try {
            const postRef = doc(db, 'promote-others', id);
            await updateDoc(postRef, {
                date: Timestamp.fromDate(new Date(date)),
                title,
                inspirationQuote,
                artistName,
                imgUrl,
                likes
            });
            setIsDialogOpen(false);
            window.location.reload();
        } catch (err) {
            console.error('Error updating post:', err);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSelectedPost(prevPost => ({
            ...prevPost,
            [name]: value
        }));
    };

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const nextPage = () => {
        setCurrentPage((prevPage) => {
            const next = Math.min(prevPage + 1, Math.ceil(posts.length / postsPerPage));
            scrollToTop(); // Scroll to top when navigating to next page
            return next;
        });
    };

    const prevPage = () => {
        setCurrentPage((prevPage) => {
            const prev = Math.max(prevPage - 1, 1);
            setTimeout(() => {
                scrollToTop(); // Scroll to top after a short delay
            }, 100); // Adjust delay time as needed (e.g., 100ms)
            return prev;
        });
    };


    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-black to-white p-4">
            <h1 className="text-4xl font-bold text-white my-8 mt-16 text-center">Update Promote Artists Items</h1>
            <div className="promote-others-list w-full max-w-2xl mt-1">
                {loading ? (
                    <Spinner />
                ) : (
                    currentPosts.length > 0 ? (
                        currentPosts.map((post, index) => (
                            <div
                                key={index}
                                className="bg-gray-900 bg-opacity-60 p-4 rounded-lg mb-4 text-white"
                            >
                                <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                                <p className="mb-2"><strong>Quote:</strong> {post.inspirationQuote}</p>
                                <p className="mb-2"><strong>Artist:</strong> {post.artistName}</p>
                                <p className="mb-2"><strong>Date:</strong> {formatDate(post.date)}</p>
                                <img
                                    src={post.imgUrl}
                                    alt={post.title}
                                    className="max-w-full h-auto rounded-lg mt-2"
                                />
                                <button className="bg-gray-800 text-white px-2 py-1 rounded-lg mt-2">
                                    Likes: {post.likes || 0}
                                </button>
                                <div className="flex justify-end space-x-2 mt-4">
                                    <button
                                        className="py-1 px-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                                        onClick={() => handleUpdateClick(post)}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="py-1 px-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
                                        onClick={() => handleDeleteClick(post.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-white">No inspirations found.</p>
                    )
                )}
                {isDialogOpen && selectedPost && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg w-96">
                            <h2 className="text-2xl font-bold mb-4">Update Inspiration</h2>
                            <form onSubmit={handleUpdate}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-semibold mb-2">Title:</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={selectedPost.title}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-semibold mb-2">Inspiration Quote:</label>
                                    <textarea
                                        name="inspirationQuote"
                                        value={selectedPost.inspirationQuote}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-40 resize-none"
                                    ></textarea>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-semibold mb-2">Artist Name:</label>
                                    <input
                                        type="text"
                                        name="artistName"
                                        value={selectedPost.artistName}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-semibold mb-2">Date:</label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={selectedPost.date.toISOString().split('T')[0]}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-semibold mb-2">Image URL:</label>
                                    <input
                                        type="text"
                                        name="imgUrl"
                                        value={selectedPost.imgUrl}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-semibold mb-2">Likes:</label>
                                    <input
                                        type="number"
                                        name="likes"
                                        value={selectedPost.likes}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() => setIsDialogOpen(false)}
                                        className="mr-2 py-1 px-4 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-300"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="py-1 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                                    >
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={posts.length}
                currentPage={currentPage}
                nextPage={nextPage}
                prevPage={prevPage}
            />
        </div>
    );
}
