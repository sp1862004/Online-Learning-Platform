import 'animate.css';

const Footer = () => {
    return (
        <footer className="footer bg-dark text-light py-4">
            <div className="container text-center mb-3 mt-3 animate__animated animate__fadeInUp pb-3 pt-3">
                <h5 className="mb-3 animate__animated animate__bounceIn">Stay Connected for Upcoming Courses!</h5>
                <div className="social-icons mb-3">
                    <a href="/" className="social-icon mx-2 text-light animate__animated animate__fadeIn" style={{animationDelay: '0.1s'}}>
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="/" className="social-icon mx-2 text-light animate__animated animate__fadeIn" style={{animationDelay: '0.2s'}}>
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="/" className="social-icon mx-2 text-light animate__animated animate__fadeIn" style={{animationDelay: '0.3s'}}>
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/shailesh-patel-3102bb277" target="_blank" rel="noopener noreferrer" className="social-icon mx-2 text-light animate__animated animate__fadeIn" style={{animationDelay: '0.4s'}}>
                        <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a href="https://github.com/sp1862004" target="_blank" rel="noopener noreferrer" className="social-icon mx-2 text-light animate__animated animate__fadeIn" style={{animationDelay: '0.5s'}}>
                        <i className="fab fa-github"></i>
                    </a>
                </div>
                <p className="mb-0 animate__animated animate__fadeIn" style={{animationDelay: '0.6s'}}>
                    © {new Date().getFullYear()} <span className="fw-bold">Online Learning Hub</span>. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
