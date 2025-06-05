<!-- Folder Structure -->

hotel-booking-app/
│
├── public/
│ └── index.html
│
├── src/
│ ├── assets/ # Images, fonts, icons, etc.
│ │ ├── images/
│ │ └── icons/
│
│ ├── components/ # Reusable UI components
│ │ ├── Header.jsx
│ │ ├── Footer.jsx
│ │ ├── RoomCard.jsx
│ │ └── DatePicker.jsx
│
│ ├── features/ # Feature-based structure
│ │ ├── booking/ # Booking-related logic
│ │ │ ├── BookingForm.jsx
│ │ │ ├── BookingList.jsx
│ │ │ └── bookingSlice.js
│ │ ├── rooms/ # Rooms feature
│ │ │ ├── RoomList.jsx
│ │ │ ├── RoomDetails.jsx
│ │ │ └── roomsSlice.js
│ │ └── auth/ # Login/Register
│ │ ├── Login.jsx
│ │ ├── Register.jsx
│ │ └── authSlice.js
│
│ ├── hooks/ # Custom React hooks
│ │ └── useAuth.js
│
│ ├── layouts/ # Layouts for different pages
│ │ ├── MainLayout.jsx
│ │ └── AdminLayout.jsx
│
│ ├── pages/ # Main pages
│ │ ├── Home.jsx
│ │ ├── Rooms.jsx
│ │ ├── Booking.jsx
│ │ ├── Contact.jsx
│ │ └── NotFound.jsx
│
│ ├── routes/ # All routing configurations
│ │ └── AppRoutes.jsx
│
│ ├── services/ # API calls and services
│ │ └── api.js
│
│ ├── store/ # Redux or Zustand store
│ │ └── store.js
│
│ ├── styles/ # Global styles and themes
│ │ ├── tailwind.css
│ │ └── variables.css
│
│ ├── utils/ # Helper functions and constants
│ │ └── dateUtils.js
│
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
│
├── .env # Environment variables
├── package.json
├── tailwind.config.js # If using Tailwind CSS
└── README.md
