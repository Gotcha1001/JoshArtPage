import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { auth, db } from '../firebaseconfig/firebase';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';

const Home = () => {
    const adminEmail = "admin@example.com";

    const [backgroundImageUrl, setBackgroundImageUrl] = useState('');
    const [mainImageUrl, setMainImageUrl] = useState('');
    const [showBackgroundDialog, setShowBackgroundDialog] = useState(false);
    const [showMainImageDialog, setShowMainImageDialog] = useState(false);
    const [newImageUrl, setNewImageUrl] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setCurrentUser(user.email);
                setIsAdmin(user.email === adminEmail);
            } else {
                setCurrentUser(null);
                setIsAdmin(false);
            }
        });

        const fetchBackgroundImages = async () => {
            const docRef = doc(collection(db, 'settings'), 'background');
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setBackgroundImageUrl(data.backgroundImageUrl || '');
                setMainImageUrl(data.mainImageUrl || '');
            } else {
                setBackgroundImageUrl('');
                setMainImageUrl('');
            }
        };

        fetchBackgroundImages();

        return unsubscribe;
    }, []);

    const handleBackgroundUrlSubmit = async () => {
        setBackgroundImageUrl(newImageUrl);
        setShowBackgroundDialog(false);
        setNewImageUrl('');

        const docRef = doc(collection(db, 'settings'), 'background');
        await setDoc(docRef, { backgroundImageUrl: newImageUrl, mainImageUrl }); // Update only backgroundImageUrl
    };

    const handleMainImageUrlSubmit = async () => {
        setMainImageUrl(newImageUrl);
        setShowMainImageDialog(false);
        setNewImageUrl('');

        const docRef = doc(collection(db, 'settings'), 'background');
        await setDoc(docRef, { backgroundImageUrl, mainImageUrl: newImageUrl }); // Update only mainImageUrl
    };


    return (
        <div
            className="flex flex-col items-center justify-start min-h-screen p-4 relative"
            style={{
                backgroundImage: `url(${backgroundImageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
                filter: 'brightness(90%)',  // slightly reduce brightness
            }}
        >
            {currentUser === adminEmail && (
                <>
                    <button
                        className="relative top-3 left-4 md:left-3 bg-teal-600 text-white mb-4 px-4 py-2 rounded-full shadow-lg hover:bg-teal-700 transition-colors duration-300 z-10"
                        onClick={() => setShowBackgroundDialog(true)}
                    >
                        Change Background
                    </button>
                    <button
                        className="relative top-3 left-4 md:left-3 bg-teal-600 text-white mb-4 px-4 py-2 rounded-full shadow-lg hover:bg-teal-700 transition-colors duration-300 z-10"
                        onClick={() => setShowMainImageDialog(true)}
                    >
                        Change Main Image
                    </button>
                </>
            )}

            <h1 className="text-3xl md:text-4xl hover:bg-teal-600 rounded-full p-3 font-bold text-center mb-8 text-white gradient-background1">CORNERSTONE IN TH3 SPIRIT</h1>

            <div className="w-full md:w-3/4 max-w-xl mb-8">
                <img
                    src="https://github.com/Gotcha1001/My-Images-for-sites-Wes/blob/main/JoshLogo.JPG?raw=true"
                    alt="Josh's Art Logo"
                    className="mx-auto rounded-lg shadow-lg zoom"
                    style={{ maxWidth: '100%' }}
                />
            </div>


            <div className="w-full md:w-3/4 max-w-xl mb-8">
                <img
                    src={mainImageUrl}
                    alt="Josh's Art Logo"
                    className="mx-auto rounded-lg shadow-lg zoom"
                    style={{ maxWidth: '100%' }}
                />
            </div>

            <Carousel className="w-full md:w-3/4 mb-8" style={{ maxWidth: '600px' }} interval={1000}>
                <Carousel.Item>
                    <img
                        className="d-block w-full rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
                        src="https://scontent-jnb2-1.xx.fbcdn.net/v/t39.30808-6/296994898_606217204394792_1204140282823884444_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=DZ9JG4ZTR7gQ7kNvgGRuzNO&_nc_ht=scontent-jnb2-1.xx&oh=00_AYApOqcdj6coG8VvEe4qtm_Iini8R3OtflsuJ9523FcJ0A&oe=669212A1"
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-full rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
                        src="https://scontent-jnb2-1.xx.fbcdn.net/v/t39.30808-6/292277856_590530932643016_5574078880372931679_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=3IPbsndB3BcQ7kNvgHtaMy2&_nc_ht=scontent-jnb2-1.xx&oh=00_AYDaeh7rMuDqtYIHgsQFFe9u1Lbzp1-KyqmYOxqYnu_y_Q&oe=6691F3BF"
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-full rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
                        src="https://scontent-jnb2-1.xx.fbcdn.net/v/t1.6435-9/30738312_1216796741788460_4130296716568035328_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=7b2446&_nc_ohc=AxtZsfjxKCEQ7kNvgFIrNp7&_nc_ht=scontent-jnb2-1.xx&oh=00_AYAi-OGLf4jA6ZgHYUUDyW399Avu2moyPKJZ4OKXVBjN-g&oe=66B3997D"
                        alt="Third slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-full rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
                        src="https://scontent-jnb2-1.xx.fbcdn.net/v/t1.6435-9/97969910_1880355728765888_2083936724932624384_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=0327a3&_nc_ohc=cHu7beqZBzQQ7kNvgGNtK1C&_nc_ht=scontent-jnb2-1.xx&oh=00_AYDtrdbzJa6cVkok-Ld4EzZFgXhFZ1NmwAkO6Qa5aGMsJA&oe=66B3A77E"
                        alt="Fourth slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-full rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
                        src="https://scontent-jnb2-1.xx.fbcdn.net/v/t1.6435-9/98463373_1880355098765951_9219392113999872000_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=0327a3&_nc_ohc=EAAfnlUmC74Q7kNvgF_jhuq&_nc_ht=scontent-jnb2-1.xx&oh=00_AYAqFBvxO0QFm7XDNothRHz2US2nQum6VCKCrnHulDsuPg&oe=66B3A8B1"
                        alt="Fifth slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-full rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
                        src="https://scontent-jnb2-1.xx.fbcdn.net/v/t1.6435-9/83133337_1770145579786904_4465451160911740928_n.jpg?stp=dst-jpg_p960x960&_nc_cat=105&ccb=1-7&_nc_sid=06a7ca&_nc_ohc=UC3-zx9lA30Q7kNvgE39UKL&_nc_ht=scontent-jnb2-1.xx&oh=00_AYDl5ABkMqNJx-WjaqEnQ-Mzav2IbZbTIWC7aU6eCPVEEA&oe=66B3AEE2"
                        alt="Sixth slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-full rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
                        src="https://scontent-jnb2-1.xx.fbcdn.net/v/t1.6435-9/74624030_1674658559335607_2799610763302404096_n.jpg?stp=dst-jpg_p960x960&_nc_cat=110&ccb=1-7&_nc_sid=06a7ca&_nc_ohc=pHB8RH4MV0QQ7kNvgFjoXws&_nc_ht=scontent-jnb2-1.xx&oh=00_AYA-dJmHkHX6bapZqCqDfxumARfM0ljquTGqjZmlp_q5qA&oe=66B3C2CD"
                        alt="Sixth slide"
                    />
                </Carousel.Item>
            </Carousel>

            <div className="w-full md:w-3/4 max-w-xl bg-white rounded-lg shadow-md overflow-hidden mt-8 hover:scale-105 transition-transform duration-300 gradient-background2">
                <div className="p-4">
                    <h2 className="text-xl font-semibold mb-4 text-center">Josh's Latest Video</h2>
                    <div className="relative" style={{ paddingBottom: '56.25%' }}>
                        <iframe
                            title="Josh's Video"
                            src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Fpaintingonpurposeco%2Fvideos%2F857612178952085%2F&show_text=false&width=560&t=0"
                            className="absolute top-0 left-0 w-full h-full rounded-lg"
                            style={{ border: 'none' }}
                            allowFullScreen={true}
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        ></iframe>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 w-full md:w-3/4">
                <div className="w-full h-64 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
                    <img className="object-co w-full h-full" src="https://scontent-jnb2-1.xx.fbcdn.net/v/t1.6435-9/42356084_1352853621516104_461180480004292608_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=06a7ca&_nc_ohc=d0TKzywjUCcQ7kNvgETApAk&_nc_ht=scontent-jnb2-1.xx&oh=00_AYASSpPKXIxiOHWCkJSQqYSwgXRU3Q6xf35lW7sD6PKvRA&oe=66B3C030" alt="Artwork" />
                </div>
                <div className="w-full h-64 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
                    <img className="object-cover w-full h-full" src="https://images.pexels.com/photos/1209843/pexels-photo-1209843.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Artwork" />
                </div>
                <div className="w-full h-64 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
                    <img className="object-cover w-full h-full" src="https://images.pexels.com/photos/1646953/pexels-photo-1646953.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Artwork" />
                </div>
                <div className="w-full h-64 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
                    <img className="object-cover w-full h-full" src="https://images.pexels.com/photos/1109354/pexels-photo-1109354.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Artwork" />
                </div>
                <div className="w-full h-64 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
                    <img className="object-cover w-full h-full" src="https://images.pexels.com/photos/1704120/pexels-photo-1704120.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Artwork" />
                </div>
                <div className="w-full h-64 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
                    <img className="object-cover w-full h-full" src="https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Artwork" />
                </div>
            </div>

            {showBackgroundDialog && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Enter New Background Image URL</h2>
                        <input
                            type="text"
                            value={newImageUrl}
                            onChange={(e) => setNewImageUrl(e.target.value)}
                            className="border border-gray-300 p-2 w-full mb-4 rounded-md"
                            placeholder="Enter URL here..."
                        />
                        <div className="flex justify-end">
                            <button
                                className="bg-teal-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-teal-700 transition-colors duration-300 mr-2"
                                onClick={handleBackgroundUrlSubmit}
                            >
                                Submit
                            </button>
                            <button
                                className="bg-red-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-red-700 transition-colors duration-300"
                                onClick={() => setShowBackgroundDialog(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showMainImageDialog && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Enter New Main Image URL</h2>
                        <input
                            type="text"
                            value={newImageUrl}
                            onChange={(e) => setNewImageUrl(e.target.value)}
                            className="border border-gray-300 p-2 w-full mb-4 rounded-md"
                            placeholder="Enter URL here..."
                        />
                        <div className="flex justify-end">
                            <button
                                className="bg-teal-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-teal-700 transition-colors duration-300 mr-2"
                                onClick={handleMainImageUrlSubmit}
                            >
                                Submit
                            </button>
                            <button
                                className="bg-red-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-red-700 transition-colors duration-300"
                                onClick={() => setShowMainImageDialog(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;