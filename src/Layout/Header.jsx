import { Link } from 'react-router-dom';
import 'animate.css';

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-lg">
            <div className="container-fluid">
                <Link to={'/'} className="navbar-brand ms-5 text-light animate__animated animate__bounceIn">
                    Online Learning Hub <i className="fas fa-book-open"></i>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to={'/'} className="nav-link animate__animated animate__fadeInDown text-light" aria-current="page">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/Index'} className="nav-link animate__animated animate__fadeInDown text-light" aria-current="page">Add Course</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/signup'} className="nav-link animate__animated animate__fadeInDown text-light" aria-current="page">Register</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/contact'} className="nav-link animate__animated animate__fadeInDown text-light" aria-current="page">Contact Us</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;
