# Job Application Tracker

A full-stack web application for tracking job applications with user authentication, built with the MERN stack (MongoDB, Express, React, Node.js).

## Features at a Glance

- **Modern, Responsive UI**: Clean, mobile-friendly design with a dashboard layout and sidebar navigation
- **User Authentication**: Register, login, and secure access to user data using JWT
- **Job Management**: Create, read, update, and delete job applications with detailed forms
- **Dashboard**: View all your job applications in one place with visual stats and quick actions
- **Filtering, Sorting & Search**: Filter jobs by status, sort by date, and search by company or role
- **Progress Analytics**: Visualize your job search with statistics and insights
- **Reminders & Notifications**: Get timely feedback with React Toastify notifications
- **Advanced Form Design**: All forms use modern input groups, icons, and validation for a smooth experience
- **Accessibility**: Keyboard navigation and accessible color contrast
- **Works Everywhere**: Access from desktop, tablet, or mobile

## Screenshots

![Screenshot 2025-06-20 013154](https://github.com/user-attachments/assets/3d2f48c0-e398-42ee-b1cf-4c6fae69c116)
![Screenshot 2025-06-20 013001](https://github.com/user-attachments/assets/a38ae761-b27c-4005-bf97-bfb3429b6cf6)
![Screenshot 2025-06-20 013100](https://github.com/user-attachments/assets/4d8d0952-5cb1-4746-af79-f9a3748555a2)


## Tech Stack

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- RESTful API design

### Frontend
- React (no TypeScript)
- React Router for navigation
- Context API for state management
- React Toastify for notifications
- react-icons for beautiful icons
- Responsive CSS (custom, no Bootstrap)

## Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB (local installation or MongoDB Atlas)

### Installation

1. Clone the repository
```
git clone <repository-url>
cd job-tracker
```

2. Install backend dependencies
```
cd backend
npm install
```

3. Install frontend dependencies
```
cd ../frontend
npm install
```

4. Set up environment variables
   - Create a `.env` file in the backend directory
   - Add the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/job-tracker
   JWT_SECRET=your_jwt_secret_key_change_this_in_production
   JWT_EXPIRE=30d
   ```

### Running the Application

1. Start the backend server
```
cd backend
npm run dev
```

2. Start the frontend development server
```
cd ../frontend
npm start
```

3. Access the application at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/me` - Get current user profile

### Jobs
- `GET /api/jobs` - Get all jobs for the logged in user
- `GET /api/jobs/:id` - Get a specific job
- `POST /api/jobs` - Create a new job
- `PUT /api/jobs/:id` - Update a job
- `DELETE /api/jobs/:id` - Delete a job

## License

This project is licensed under the MIT License. 
