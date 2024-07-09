import React, { useState } from 'react';
import { db, Timestamp } from '../firebaseconfig/firebase'; // Import Timestamp from firebase config
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function PromoteInspirationsUpload() {
    const [title, setTitle] = useState('');
    const [inspirationQuote, setInspirationQuote] = useState('');
    const [artistName, setArtistName] = useState('');
    const [date, setDate] = useState(''); // State to hold selected date
    const [imgUrl, setImgUrl] = useState(''); // State to hold image URL
    const [likes, setLikes] = useState(0); // State to hold likes count
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Convert the selected date string to a JavaScript Date object
            const selectedDate = new Date(date);
            // Convert the Date object to a Firestore Timestamp
            const dateTimestamp = Timestamp.fromDate(selectedDate);

            await addDoc(collection(db, 'promote-others'), {
                title,
                inspirationQuote,
                artistName,
                date: dateTimestamp,
                imgUrl, // Include the image URL
                likes // Include likes as a number
            });
            setMessage('Inspiration added successfully!');
            setTitle('');
            setInspirationQuote('');
            setArtistName('');
            setDate('');
            setImgUrl(''); // Reset the image URL
            setLikes(0); // Reset likes count
            navigate('/promoting-other-artists');
        } catch (error) {
            console.error('Error adding document: ', error);
            setMessage('Failed to add inspiration.');
        }
    };

    const handleCancel = () => {
        // Clear form fields
        setTitle('');
        setInspirationQuote('');
        setArtistName('');
        setDate('');
        setImgUrl('');
        setLikes(0);
        // Optional: Navigate away from the form or perform other actions
        navigate('/'); // Example: Navigate to home page
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg mx-auto gradient-background m-4">
            <h2 className="text-2xl font-bold mb-4">Add Promote Artist Item</h2>
            {message && <p className={`mb-4 ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}
            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Title:</label>
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
                <label className="block text-gray-700 font-semibold mb-2">Inspiration Quote:</label>
                <textarea
                    value={inspirationQuote}
                    onChange={(e) => setInspirationQuote(e.target.value)}
                    placeholder="Inspiration Quote"
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-40 resize-none whitespace-pre-wrap"
                ></textarea>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Artist Name:</label>
                <input
                    type="text"
                    value={artistName}
                    onChange={(e) => setArtistName(e.target.value)}
                    placeholder="Artist Name"
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Date:</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Image URL:</label>
                <input
                    type="url"
                    value={imgUrl}
                    onChange={(e) => setImgUrl(e.target.value)}
                    placeholder="Image URL"
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Likes:</label>
                <input
                    type="number"
                    value={likes}
                    onChange={(e) => setLikes(parseInt(e.target.value))}
                    placeholder="Likes"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="flex space-x-4">
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                >
                    Add Inspiration
                </button>
                <button
                    type="button"
                    onClick={handleCancel}
                    className="w-full py-2 px-4 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition duration-300"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}
