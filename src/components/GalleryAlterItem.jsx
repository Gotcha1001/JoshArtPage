import React, { useState, useEffect } from 'react';
import { db, Timestamp } from '../firebaseconfig/firebase';
import { collection, query, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import Spinner from './Spinner';
import Pagination from './Pagination'; // Import Pagination component

const GalleryAlterItem = () => {
    const [galleryItems, setGalleryItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [picUrl, setPicUrl] = useState('');

    const formatDate = (date) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    useEffect(() => {
        const fetchGalleryItems = async () => {
            try {
                const q = query(collection(db, 'gallery'));
                const querySnapshot = await getDocs(q);
                const itemsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    date: new Date(doc.data().date.seconds * 1000)
                }));
                itemsData.sort((a, b) => b.date - a.date);
                setGalleryItems(itemsData);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching gallery items:', err);
                setError('Failed to load gallery items.');
            }
        };

        fetchGalleryItems();
    }, []);

    const handleUpdateClick = (item) => {
        setSelectedItem(item);
        setPicUrl(item.picUrl);
        setIsDialogOpen(true);
    };

    const handleDeleteClick = async (itemId) => {
        try {
            await deleteDoc(doc(db, 'gallery', itemId));
            setGalleryItems(galleryItems.filter(item => item.id !== itemId));
        } catch (err) {
            console.error('Error deleting item:', err);
        }
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        const { id, date, title, venue, description, soldFor, likes } = selectedItem;
        try {
            const itemRef = doc(db, 'gallery', id);
            await updateDoc(itemRef, {
                date: Timestamp.fromDate(new Date(date)),
                title,
                venue,
                description,
                soldFor,
                likes,
                picUrl
            });
            setIsDialogOpen(false);
            window.location.reload();
        } catch (err) {
            console.error('Error updating item:', err);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSelectedItem(prevItem => ({
            ...prevItem,
            [name]: value
        }));
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = galleryItems.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        // Scroll to the top of the page
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const nextPage = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, Math.ceil(galleryItems.length / itemsPerPage)));
        // Scroll to the top of the page
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const prevPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
        // Scroll to the top of the page after updating currentPage
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100); // Adjust delay as needed
    };


    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-black to-white p-4 ">
            <h1 className="text-4xl font-bold text-white my-8 mt-16  ">Gallery - Update Delete Items</h1>
            <div className="gallery-list w-full max-w-2xl mt-1 ">
                {currentItems.length > 0 ? (
                    currentItems.map((item, index) => (
                        <div
                            key={index}
                            className="gallery-item mb-4 p-6 bg-slate-950 rounded-lg shadow-lg transition transform hover:scale-105 gradient-background2"
                        >
                            <p className="text-2xl font-bold mb-2 text-white">
                                Date: {formatDate(new Date(item.date))}
                            </p>
                            {item.picUrl && (
                                <div className="w-full h-96 mb-4 rounded overflow-hidden flex justify-center items-center">
                                    <img src={item.picUrl} alt="Gallery Item" className="w-full h-full object-contain transition transform hover:wobble" />
                                </div>
                            )}
                            <p className="text-gray-200 mb-4">Title: {item.title}</p>
                            <p className="text-gray-200 mb-4">Venue: {item.venue}</p>
                            <p className="text-gray-200 mb-4">Description: {item.description}</p>
                            <p className="text-gray-200 mb-4">Sold For: {item.soldFor}</p>
                            <div className="flex items-center">
                                <p className="text-gray-200 text-sm mr-2">Likes: {item.likes}</p>
                                <button
                                    className="bg-teal-500 hover:bg-teal-700 text-white py-2 px-4 rounded mr-2"
                                    onClick={() => handleUpdateClick(item)}
                                >
                                    Update
                                </button>
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
                                    onClick={() => handleDeleteClick(item.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-white">No gallery items available</p>
                )}
            </div>

            {isDialogOpen && selectedItem && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4">Update Item</h2>
                        <form onSubmit={handleUpdate}>
                            <div className="mb-4">
                                <label htmlFor="date" className="block text-gray-700 font-bold mb-2">Date:</label>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    value={new Date(selectedItem.date).toISOString().split('T')[0]}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title:</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={selectedItem.title}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="venue" className="block text-gray-700 font-bold mb-2">Venue:</label>
                                <input
                                    type="text"
                                    id="venue"
                                    name="venue"
                                    value={selectedItem.venue}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description:</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={selectedItem.description}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                ></textarea>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="soldFor" className="block text-gray-700 font-bold mb-2">Sold For:</label>
                                <input
                                    type="text"
                                    id="soldFor"
                                    name="soldFor"
                                    value={selectedItem.soldFor}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="likes" className="block text-gray-700 font-bold mb-2">Likes:</label>
                                <input
                                    type="number"
                                    id="likes"
                                    name="likes"
                                    value={selectedItem.likes}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="picUrl" className="block text-gray-700 font-bold mb-2">Picture URL:</label>
                                <input
                                    type="text"
                                    id="picUrl"
                                    name="picUrl"
                                    value={picUrl}
                                    onChange={(e) => setPicUrl(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
                                    onClick={() => setIsDialogOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={galleryItems.length}
                currentPage={currentPage}
                paginate={paginate}
                nextPage={nextPage}
                prevPage={prevPage}
            />
        </div>
    );
};

export default GalleryAlterItem;
