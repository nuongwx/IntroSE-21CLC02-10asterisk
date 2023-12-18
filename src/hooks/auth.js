// Set an item in localStorage
export const setAuthToken = (token) => {
    localStorage.setItem('authToken', token);
};

// Get an item from localStorage
export const getAuthToken = () => {
    return localStorage.getItem('authToken');
};

// Remove an item from localStorage
export const removeAuthToken = () => {
    localStorage.removeItem('authToken');
};