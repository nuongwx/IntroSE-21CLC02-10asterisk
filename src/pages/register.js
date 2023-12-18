import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [registerError, setRegisterError] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegister = async (event) => {
        event.preventDefault();

        try {
            // Adjust the API endpoint for registration
            const response = await axios.post('http://localhost:3001/auth/register', credentials);
            const user = response.data;
            console.log('User registered:', user);

            // Assuming successful registration, you can navigate to the login page
            navigate('/login');
        } catch (error) {
            console.error('Registration failed:', error.message);
            setRegisterError('Registration failed. Please try again.');
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center vh-100 text-dark" style={{ backgroundColor: '#FFF7E6'}}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xs-10 col-sm-8 col-md-6 col-lg-4">
                        <div className="text-center mb-4">
                            <img src="logo.svg" alt="Logo" width="72" height="72"/>
                            <h1 className="h3 mt-2 Toast">Đăng Ký</h1>
                        </div>
                        <form onSubmit={handleRegister}>
                            <span className="text-danger">{registerError}</span>
                            <div className="form-group my-3">
                                <label className="Toast" htmlFor="formEmail">Email</label>
                                <input type="email" id="email" name="email" className="form-control" placeholder="Enter email" value={credentials.email} onChange={handleInputChange} required/>
                            </div>
                            <div className="form-group my-3">
                                <label className="Toast" htmlFor="formPassword">Mật khẩu</label>
                                <input type="password" id="password" name="password" className="form-control" value={credentials.password} onChange={handleInputChange} placeholder="Mật khẩu" required/>
                            </div>
                            <button type="submit" className="btn btn-warning w-100">Đăng ký</button>
                        </form>
                        <div className="mt-3 text-center">
                            <p className="Toast">
                                Đã có tài khoản? <a href="/login" className="text-primary text-decoration-none">Đăng nhập</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
