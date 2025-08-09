import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log('Form submitted:', formData);
        alert('Thank you for your message! We will get back to you soon.');
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
        });
    };

    return (
        <div className="min-h-screen dark:bg-slate-900">
            {/* Hero Section */}
            <div className="py-10 bg-Primary text-white text-center">
                <h1 className="text-2xl md:text-3xl font-bold mb-4">Get in Touch</h1>
                <p className="text-xl l mx-auto">We're here to help with your hotel booking needs</p>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-16 max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div className="bg-white dark:text-white dark:bg-slate-800/50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                                <FaPhone className="text-blue-600 text-2xl" />
                            </div>
                            <h3 className="text-xl font-semibold text-center mb-2">Call Us</h3>
                            <p className="text-gray-600 text-center dark:text-white">+1 (+880) 1094939526</p>
                            <p className="text-gray-500 dark:text-white text-sm text-center">24/7 Booking Support</p>
                        </div>

                        <div className="bg-white dark:bg-slate-800/50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                                <FaEnvelope className="text-blue-600 text-2xl" />
                            </div>
                            <h3 className="text-xl dark:text-white font-semibold text-center mb-2">Email Us</h3>
                            <p className="text-gray-600 dark:text-white text-center">info@triphaven.com</p>
                            <p className="text-gray-500 dark:text-white text-sm text-center">Response within 24 hours</p>
                        </div>

                        <div className="bg-white dark:bg-slate-800/50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                                <FaMapMarkerAlt className="text-blue-600 text-2xl" />
                            </div>
                            <h3 className="text-xl dark:text-white font-semibold text-center mb-2">Our Location</h3>
                            <p className="text-gray-600 text-center dark:text-white">Mirpur 10, Meto station</p>
                            <p className="text-gray-600 dark:text-white text-center">Dhaka, Bangladesh</p>
                        </div>


                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-xl shadow-lg">
                        <h2 className="text-2xl font-bold mb-6  text-gray-800">Send Us a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center"
                            >
                                <FaPaperPlane className="mr-2" />
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Map Section */}
            <div className="container mx-auto px-4 pb-16 max-w-6xl">
                <h2 className="text-2xl font-bold mb-8 text-center dark:text-white text-gray-800">Find Us on the Map</h2>
                <div className="bg-gray-200 rounded-xl overflow-hidden h-96">
                    {/* Replace with your actual map component or iframe */}
                    <div className="w-full h-full flex items-center justify-center bg-blue-100">
                        <p className="text-blue-600 font-medium">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11439.73664642907!2d91.43474563194728!3d23.21297068540224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37537220ee8b78a5%3A0x8ad22d54f44dd51d!2sParshuram!5e1!3m2!1sen!2sbd!4v1754765958073!5m2!1sen!2sbd" width="1152" height="450"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;