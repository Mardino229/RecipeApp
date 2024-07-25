import React, { useState } from 'react';
import {Link} from "react-router-dom";

export default function signup() {
    const [email, setEmail] = useState('');
    const [pseudo, setPseudo] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Gérer la soumission du formulaire ici
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Create a account</h2>
                <div className="form-group">
                    <label htmlFor="name">Pseudo</label>
                    <input
                        type="name"
                        id="name"
                        placeholder="your pseudo-chef"
                        value={pseudo}
                        onChange={(e) => setPseudo(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-button">Signup</button>
                <div className="login-links">
                    <a href="/forgot-password">Forgot password?</a>
                    <Link to="/login">Login</Link>
                </div>
            </form>
        </div>
    );
}
