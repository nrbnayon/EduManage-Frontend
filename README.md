# EduManage

EduManage is a comprehensive platform built using the MERN stack (MongoDB, Express.js, React, and Node.js) designed to revolutionize the way educational institutions, tutors, and students interact. The platform aims to make skill learning and class management more efficient and accessible.

## Live Demo

Check out the live demo of the project: [EduManage Live](https://edu-manage.netlify.app/)

## Admin Credentials

- **Email:** admin@gmail.com
- **Password:** Admin123

## Features

- **Navbar:** Dynamic navbar with logo, Home, All Classes, Teach on EduManage, Sign In, and profile picture (when logged in).
- **Homepage:**
  - Banner section with carousel images.
  - Partners or collaborators section.
  - Highlight popular or recommended classes.
  - Feedback section with a carousel.
  - Statistics section showing total users, classes, and enrollments.
  - Teacher registration section.
  - Additional relevant sections.
- **All Classes:** Displays approved classes in a card format with details.
- **Class Details Page:** Displays detailed information about the class with an enroll button.
- **Teach on EduManage:** Form for users to apply as a teacher.
- **Student Dashboard:**
  - My Enroll Class: Displays classes the student is enrolled in.
  - Profile: Shows user information.
- **Admin Dashboard:**
  - Teacher Requests: Approve or reject teacher applications.
  - Users: Manage users and assign admin roles.
  - All Classes: Manage and approve/reject classes.
  - Profile: Shows admin information.
- **Teacher Dashboard:**
  - Add Class: Form to add new classes.
  - My Class: Manage classes, update, delete, and see details.
  - Profile: Shows teacher information.
- **Authentication:** Login and registration with email/password and Google Sign-In.
- **Pagination:** Implemented on all tables and cards.

## Technologies Used

- **Frontend:** React, Tailwind CSS, React Router, React Query, Axios, React Hook Form, JWT
- **Backend:** Node.js, Express.js, MongoDB
- **Libraries:** Swiper, SweetAlert2, React Toastify, React Icons, React Helmet Async

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/nrbnayon/edumanage-client.git
   ```

2. Navigate to the client directory:

   ```sh
   cd edu-manage/client
   ```

3. Install the dependencies:
   ```sh
   npm install
   ```

### Running the Application

1. Start the development server:

   ```sh
   npm run dev
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:5317
   ```

### Environment Variables

Create a `.env` file in the `client` directory and add the following environment variables:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_MEASUREMENTID=
VITE_PAYMENT_GETWAY=
```

### Building for Production

1. Build the application for production:

   ```sh
   npm run build
   ```

2. The production-ready files will be in the `build` directory.

## Usage

- **Navbar:** Navigate to different sections of the website.
- **Homepage:** Explore various sections including banner, partners, popular classes, feedback, statistics, and teacher registration.
- **All Classes:** View and enroll in available classes.
- **Class Details:** Get detailed information about a class and proceed to enrollment.
- **Teach on EduManage:** Apply to become a teacher by filling out the form.
- **Student Dashboard:** Access enrolled classes and profile information.
- **Admin Dashboard:** Manage teacher requests, users, and classes.
- **Teacher Dashboard:** Add new classes, manage existing ones, and view profile information.
- **Authentication:** Login and register using email/password or Google Sign-In.

## Challenges

- Integrated react-hook-form in all form pages.
- Applied JWT for authentication and stored the token in local storage.
- Added pagination to all tables and cards (showing 10 items at a time).

## Contributing

Contributions are welcome! Please fork the repository and create a pull request for any feature enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or issues, please contact [nrbnayon@gmail.com](mailto:nrbnayon@gmail.com).
