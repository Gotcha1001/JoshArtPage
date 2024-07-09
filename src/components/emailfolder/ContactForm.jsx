import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                form.current,
                import.meta.env.VITE_EMAILJS_USER_ID
            )
            .then(
                () => {
                    alert('Email sent successfully!');
                    form.current.reset(); // Optionally, clear the form after successful submission
                },
                (error) => {
                    console.log('FAILED...', error.text);
                    alert('Failed to send email. Please try again later.'); // Notify user on failure
                }
            );
    };

    return (
        <div className="flex justify-center">
            <form ref={form} onSubmit={sendEmail} className="max-w-md w-full bg-slate-600 hover:bg-teal-700 shadow-md rounded px-8 pt-6 pb-8 mb-4 zoom">
                <div className="mb-4">
                    <label className="block text-slate-950 text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        name="user_name"
                        placeholder="Your Name"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-slate-950 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        name="user_email"
                        placeholder="Your Email"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-slate-950 text-sm font-bold mb-2" htmlFor="message">
                        Message
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40 resize-none"
                        id="message"
                        name="message"
                        placeholder="Your Message"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-teal-500 hover:bg-teal-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContactForm;