import React, { useEffect, useState } from 'react';
import { collection, query, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseconfig/firebase';
import Spinner from './Spinner';
import Pagination from './Pagination'; // Import your Pagination component

export default function Gallery() {
    const [galleryItems, setGalleryItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8); // Number of gallery items per page

    useEffect(() => {
        const fetchGalleryItems = async () => {
            try {
                const q = query(collection(db, 'gallery'));
                const querySnapshot = await getDocs(q);
                let galleryData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    date: new Date(doc.data().date.seconds * 1000)
                }));

                galleryData.sort((a, b) => b.date - a.date);

                setGalleryItems(galleryData);
                setLoading(false);
                console.log('Gallery items fetched successfully:', galleryData);
            } catch (err) {
                console.error('Error fetching gallery items:', err);
                setError('Failed to load gallery items.');
                setLoading(false);
            }
        };

        fetchGalleryItems();
    }, []);

    const handleLike = async (itemId, currentLikes) => {
        try {
            const itemRef = doc(db, 'gallery', itemId);
            const newLikes = Number(currentLikes) + 1;

            await updateDoc(itemRef, {
                likes: newLikes
            });

            setGalleryItems(prevItems =>
                prevItems.map(item =>
                    item.id === itemId ? { ...item, likes: newLikes } : item
                )
            );
        } catch (err) {
            console.error('Error updating likes:', err);
        }
    };

    // Get current gallery items for pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = galleryItems.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const nextPage = () => setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(galleryItems.length / itemsPerPage)));
    const prevPage = () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));

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
            <h1 className="text-4xl font-bold text-white my-8 mt-16 zoom">Gallery</h1>
            <div className="gallery-list mt-1">
                {currentItems.length > 0 ? (
                    currentItems.map((item, index) => (
                        <div
                            key={index}
                            className="gallery-item p-6 bg-slate-950 rounded-lg shadow-lg transition transform hover:scale-105 mb-8 gradient-background2"
                        >
                            <p className="text-2xl font-bold mb-2 text-white">
                                Date: {item.date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </p>
                            {item.picUrl && (
                                <div className="gallery-image-container w-full mb-4 rounded overflow-hidden flex justify-center items-center">
                                    <img src={item.picUrl} alt="Gallery Item" className="gallery-image w-full h-auto object-contain transition transform hover:wobble" />
                                </div>
                            )}

                            <div className="gallery-details text-gray-200">
                                <p className="mb-4">Title: {item.title}</p>
                                <p className="mb-4">Venue: {item.venue}</p>
                                <p className="mb-4">Description: {item.description}</p>
                                <p className="mb-4">Sold For: R {item.soldFor}</p>
                            </div>

                            <div className="flex items-center">
                                <p className="text-gray-200 text-sm mr-2">Likes: {item.likes}</p>
                                <button
                                    onClick={() => handleLike(item.id, item.likes)}
                                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700 transition"
                                >
                                    Like
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-white">No gallery items available</p>
                )}
            </div>
            <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={galleryItems.length}
                currentPage={currentPage}
                nextPage={nextPage}
                prevPage={prevPage}
            />
        </div>
    );
}
