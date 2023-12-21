import React from 'react';
import { Link } from 'react-router-dom';
import useToken from '../utils/auth';

const NavbarComponent = ({ isLoggedIn, onLogout }) => {
    const { token, removeToken } = useToken();
    console.log('Token:', token);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
            {/* absolute dùng được mỗi cho trang home thôi nên tạm thời để đây */}
            {/* style={{ zIndex: 1000, position: 'absolute', width: '100%' }}> */}
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
                            <Link to="#" className="nav-link text-dark"><b>Hướng dẫn sử dụng</b></Link>
                        </li>
                        <li className="nav-item d-flex align-items-center">
                            <Link to="#" className="nav-link text-dark"><b>Tạo câu chuyện</b></Link>
                        </li>
                        <li className="nav-item d-flex align-items-center">
                            {token || isLoggedIn ? (
                                <>
                                    <a href="/profile" className="nav-link mx-lg-3">
                                        <button className="btn btn-outline-warning rounded-pill"><b>Trang cá nhân</b></button>
                                    </a>
                                    <div>
                                        <button className="btn btn-outline-warning rounded-pill" onClick={event => { removeToken(); window.location.reload(); }}><b>Đăng xuất</b></button>
                                    </div>
                                </>
                            ) : (
                                <a href="/login" className="nav-link mx-lg-3">
                                    <button className="btn btn-outline-warning rounded-pill"><b>Đăng nhập</b></button>
                                </a>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav >
    );
}

export default NavbarComponent;