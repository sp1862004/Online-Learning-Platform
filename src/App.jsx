import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'; // Import Routes
import 'react-toastify/dist/ReactToastify.css'; // Add this in your main file
import './App.css';
import Header from './Layout/Header';
import Home from './PAGES/Home/Home';
import Index from './PAGES/Write/Index';
import Footer from './Layout/Footer';
import Write from './PAGES/Write/Write';
import SignIn from './PAGES/Home/Signin';
import SignUp from './PAGES/Home/Signup';
import ContactUs from './PAGES/Home/Contect';
import BookDetailsPage from './PAGES/Home/CourseDetails';
import BookShowPage from './PAGES/Home/CourseShowPage';
import PrivateRoute from './PAGES/Home/PrivateRoute';
import { CssBaseline } from '@mui/material';
import {  CoursesProvider } from './context/CoursesContext';
import UpdateCourse from './PAGES/Write/Update';
import CourseShowPage from './PAGES/Home/CourseShowPage';


function App() {

  return (
    <>
    <CoursesProvider>
      <Router>
      <CssBaseline /> 
        <Header />
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    }
                />
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/Index" element={<PrivateRoute><Index /></PrivateRoute>} />
            <Route path="/CourseDetails/:id" element={<PrivateRoute><BookDetailsPage /></PrivateRoute>} />
            <Route path="/edit/:id" element={<PrivateRoute><UpdateCourse /></PrivateRoute>} />
            <Route path="/add" element={<PrivateRoute><Write /></PrivateRoute>} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/CourseShow/:id" element={<PrivateRoute><CourseShowPage /></PrivateRoute>} />
          

        </Routes>
        <Footer />
      </Router >
      </CoursesProvider>
    </>
  )
}

export default App

