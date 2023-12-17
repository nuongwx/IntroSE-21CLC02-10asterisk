import { Link } from 'react-router-dom';
import { removeAuthToken } from '../hooks/auth'


const NavbarComponent = ({isLoggedIn, onLogout}) => {
    const handleLogout = async () => {
        try {
            removeAuthToken()
        } catch (error) {
            // Handle any errors that may occur during logout
            console.error('Logout failed:', error);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-transparent" style={{ zIndex: 1000, position: 'absolute', width: '100%' }}>
            <div className="container">
                <Link to="/" className="navbar-brand text-warning">
                    <img src="/logo.svg" width="30" height="30" className="d-inline-block align-top mr-lg-3" alt="Logo" />
                    <b>Geo Quiz</b>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item d-flex align-items-center">
                            <Link to="#" className="nav-link"><b>Hướng dẫn sử dụng</b></Link>
                        </li>
                        <li className="nav-item d-flex align-items-center">
                            <Link to="#" className="nav-link"><b>Tạo câu chuyện</b></Link>
                        </li>
                        <li className="nav-item d-flex align-items-center">
                            <Link to="/help" className="nav-link"><b>Trợ giúp</b></Link>
                        </li>
                        { isLoggedIn ? (
                             <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className='bi bi-person-fill'></i>
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link to="/profile" className="dropdown-item">Profile</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <button onClick={event => {handleLogout(); onLogout();}} className="dropdown-item">Logout</button>
                                </ul>
                            </li>
                        ) : (
                            // Content to show when the user is not logged in
                            <li className="nav-item d-flex align-items-center">
                                <Link to="/login" className="nav-link mx-lg-3">
                                    <button className="btn btn-outline-warning rounded-pill"><b>Đăng nhập</b></button>
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavbarComponent;