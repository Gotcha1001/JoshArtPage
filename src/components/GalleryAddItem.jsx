import React, { useState } from 'react';
import { db, Timestamp } from '../firebaseconfig/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function GalleryAddItem() {
    const [date, setDate] = useState('');
    const [picUrl, setPicUrl] = useState(''); // Changed from imgUrl to picUrl
    const [title, setTitle] = useState('');
    const [venue, setVenue] = useState('');
    const [description, setDescription] = useState('');
    const [soldFor, setSoldFor] = useState(0);
    const [likes, setLikes] = useState(0);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const selectedDate = new Date(date);
            const dateTimestamp = Timestamp.fromDate(selectedDate);

            await addDoc(collection(db, 'gallery'), {
                date: dateTimestamp,
                picUrl, // Changed from imgUrl to picUrl
                title,
                venue,
                description,
                soldFor,
                likes,
            });
            setMessage('Gallery item added successfully!');
            setDate('');
            setPicUrl(''); // Reset picUrl state
            setTitle('');
            setVenue('');
            setDescription('');
            setSoldFor(0);
            setLikes(0);
            navigate('/gallery');
        } catch (error) {
            console.error('Error adding document: ', error);
            setMessage('Failed to add gallery item.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg mx-auto gradient-background2 m-4">
            <h2 className="text-2xl font-bold mb-4 text-white">Add New Gallery Item</h2>
            {message && <p className={`mb-4 ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}
            <div className="mb-4">
                <label className="block text-white font-semibold mb-2">Date:</label>
                <input
                    type="datetime-local"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="mb-4">
                <label className="block font-semibold mb-2 text-white">Image URL:</label>
                <input
                    type="text"
                    value={picUrl}
                    onChange={(e) => setPicUrl(e.target.value)}
                    placeholder="Image URL"
                    required
                    className="w-full p-2 border  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="mb-4">
                <label className="block font-semibold mb-2 text-white">Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="mb-4">
                <label className="block font-semibold mb-2 text-white">Venue:</label>
                <input
                    type="text"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    placeholder="Venue"
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="mb-4">
                <label className="block font-semibold mb-2 text-white">Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-40 resize-none whitespace-pre-wrap"
                ></textarea>
            </div>
            <div className="mb-4">
                <label className="block font-semibold mb-2 text-white">Sold For:</label>
                <input
                    type="number"
                    value={soldFor}
                    onChange={(e) => setSoldFor(parseFloat(e.target.value))}
                    placeholder="Sold For"
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
            >
                Add Gallery Item
            </button>
        </form>
    );
}
