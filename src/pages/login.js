import React, { useState , useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setAuthToken } from '../hooks/auth'

const Login = ({ isLoggedIn, onLogin, username }) => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate(); // Use the useNavigate hook for navigation

    useEffect(() => {
        // If the user is already logged in, redirect to the home page
        if (isLoggedIn) {
          navigate('/');
        }
      }, [isLoggedIn, navigate]);

    const handleInputChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        try {
            const response = await axios.post('http://localhost:3001/auth/login', credentials);
            onLogin(credentials.email);
    
            // Use the navigate function to navigate to the homepage
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error.message);
            setLoginError('Invalid email or password. Please try again.');
        }
    };

    return (
        <div class="d-flex align-items-center justify-content-center vh-100 text-dark" style={{ backgroundColor: '#FFF7E6'}}>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-xs-10 col-sm-8 col-md-6 col-lg-4">
                        <div class="text-center mb-4">
                            <img src="logo.svg" alt="Logo" width="72" height="72"/>
                            <h1 class="h3 mt-2 Toast">Đăng nhập</h1>
                        </div>
                        <form onSubmit={handleLogin}>
                            <span className="text-danger">{loginError}</span>
                            <div class="form-group my-3">
                                <label class="Toast" for="formEmail">Email</label>
                                <input type="email" id="email" name="email" className="form-control" placeholder="Enter email" value={credentials.email} onChange={handleInputChange} required/>
                            </div>
                            <div class="form-group my-3">
                                <label class="Toast" for="formPassword">Mật khẩu</label>
                                <input type="password" id="password" name="password" className="form-control" value={credentials.password} onChange={handleInputChange} placeholder="Mật khẩu" required/>
                            </div>
                            <a href="/" className="text-primary text-decoration-none">Quên mật khẩu</a>
                            <button type="submit" class="btn btn-warning w-100">Đăng nhập</button>
                        </form>
                        <div class="mt-3 text-center">
                            <p class="Toast">
                            Chưa có tài khoản? <a href="/register" class="text-primary text-decoration-none"> Đăng kí</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;