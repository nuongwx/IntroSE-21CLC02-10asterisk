import React from 'react';
import useToken from '../utils/auth';

const NavbarComponent = () => {
    const { token, setToken } = useToken();
    console.log('Token:', token);
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
            {/* absolute dùng được mỗi cho trang home thôi nên tạm thời để đây */}
            {/* style={{ zIndex: 1000, position: 'absolute', width: '100%' }}> */}
            <div className="container">
                <a href="/" className="navbar-brand text-warning">
                    <img src="/logo.svg" width="30" height="30" className="d-inline-block align-top mr-lg-3" alt="Logo" />
                    <b>Geo Quiz</b>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item d-flex align-items-center">
                            <a href="#" className="nav-link"><b>Hướng dẫn sử dụng</b></a>
                        </li>
                        <li className="nav-item d-flex align-items-center">
                            <a href="#" className="nav-link"><b>Tạo câu chuyện</b></a>
                        </li>
                        <li className="nav-item d-flex align-items-center">
                            <a href="/help" className="nav-link"><b>Trợ giúp</b></a>
                        </li>
                        <li className="nav-item d-flex align-items-center">
                            {token ?
                                <a href="/profile" className="nav-link mx-lg-3">
                                    <button className="btn btn-outline-warning rounded-pill"><b>Trang cá nhân</b></button>
                                </a>
                                : <a href="/login" className="nav-link mx-lg-3">
                                    <button className="btn btn-outline-warning rounded-pill"><b>Đăng nhập</b></button>
                                </a>
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </nav >
    );
}

export default NavbarComponent;