import React from "react";

const blogPosts = [
  {
    id: 1,
    title: "Top 10 Travel Destinations for 2025",
    date: "August 10, 2025",
    summary:
      "Discover the best travel spots to visit this year, from tropical beaches to mountain retreats. Whether you're looking for adventure, relaxation, or cultural experiences, this list covers diverse locations perfect for every type of traveler. Learn about hidden gems, must-see landmarks, and tips to make the most of your trip.",
  },
  {
    id: 2,
    title: "How to Choose the Perfect Hotel for Your Vacation",
    date: "July 28, 2025",
    summary:
      "Learn tips and tricks to find a hotel that fits your budget, preferences, and location needs. From understanding star ratings and reading reviews to considering amenities and cancellation policies, this guide will help you select accommodations that enhance your travel experience and provide comfort and convenience.",
  },
  {
    id: 3,
    title: "Packing Essentials for a Stress-Free Trip",
    date: "July 15, 2025",
    summary:
      "A comprehensive checklist of what to pack to make your travel hassle-free and enjoyable. From clothing and toiletries to tech gadgets and travel documents, get expert advice on packing smart, avoiding common mistakes, and ensuring you have everything you need for different types of trips.",
  },
  {
    id: 4,
    title: "Benefits of Booking Hotels Early",
    date: "June 30, 2025",
    summary:
      "Why booking your hotel in advance can save you money and guarantee availability. Discover how early bookings can unlock exclusive deals, provide peace of mind, and give you better options, especially during peak seasons and popular destinations. Learn practical tips to time your bookings effectively.",
  },
];

export default function Blog() {
  return (
    <div className="max-w-5xl mx-auto min-h-screen px-4 py-10">
      <h1 className="text-3xl font-semibold mb-8 text-center dark:text-white">Travel & Hotel Blog</h1>

      <div className="space-y-10">
        {blogPosts.map(({ id, title, date, summary }) => (
          <article key={id} className="border-b border-b-gray-300 pb-6">
            <h2 className="text-2xl font-semibold text-blue-700 hover:underline cursor-pointer">
              {title}
            </h2>
            <p className="text-sm text-gray-500 mb-2">{date}</p>
            <p className="text-gray-700 dark:text-white">{summary}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
