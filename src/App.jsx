// App.jsx
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import Gallery from './components/Gallery';
import GalleryAddItem from './components/GalleryAddItem';
import GalleryAlterItem from './components/GalleryAlterItem';
import About from './components/About';
import Contact from './components/Contact';
import VideoUploadForm from './components/VideoUploadForm';
import VideoArtDisplay from './components/VideoArtDisplay';
import VideoUpdate from './components/VideoUpdate';
import ArtPricing from './components/ArtPricing';
import PromotingOtherArtists from './components/PromotingOtherArtists';
import Register from './components/Register';
import Login from './components/Login';
import References from './components/footer/References';
import DataProtection from './components/footer/DataProtection';
import BusinessDetails from './components/footer/BusinessDetails';
import RootLayout from './components/RootLayout';
import ErrorPage from './components/ErrorPage';
import PromoteInspirationsUpload from './components/PromosteInspirationsUpload';
import PromoteInspirationsAlter from './components/PromoteInspirationsAlter'


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'gallery', element: <Gallery /> },
      { path: 'gallery-add-item', element: <GalleryAddItem /> },
      { path: 'gallery-alter-item', element: <GalleryAlterItem /> },
      { path: 'about', element: <About /> },
      { path: 'art-pricing', element: <ArtPricing /> },
      { path: 'contact', element: <Contact /> },
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> },
      { path: 'art-videos', element: <VideoArtDisplay /> },
      { path: 'video-update', element: <VideoUpdate /> },
      { path: 'promoting-other-artists', element: <PromotingOtherArtists /> },
      { path: 'video-upload-form', element: <VideoUploadForm /> },
      { path: 'references', element: <References /> },
      { path: 'data-protection', element: <DataProtection /> },
      { path: 'business-details', element: <BusinessDetails /> },
      { path: 'upload-inspirations', element: <PromoteInspirationsUpload /> },
      { path: 'alter-inspirations', element: <PromoteInspirationsAlter /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
