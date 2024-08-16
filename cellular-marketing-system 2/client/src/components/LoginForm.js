
import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Sending login request:", { email });  // No password or secret code
            const res = await axios.post('http://localhost:5000/api/users/login', { email });
            alert(res.data.msg);
        } catch (err) {
            console.error("Login failed:", err);
            alert('Login failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
