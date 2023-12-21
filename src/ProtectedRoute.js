// ProtectedRoute.js
import React, { useState, useEffect } from 'react';
import { Route, Navigate, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, children }) => {
    console.log(isAuthenticated)
    if(isAuthenticated){
        return children
    }else{
        return <Navigate to="/" replace />
    }
};

export default ProtectedRoute;