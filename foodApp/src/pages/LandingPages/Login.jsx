import React, {useEffect, useState, useRef, useContext} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import axiosClient from "../../services/axios.jsx";
import {EMAIL_REGEX, LOGIN_URL} from "../../constants/index.jsx";
import useAuth from "../../hooks/useAuth.jsx";

export default function Login() {

    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const [username, setUsername] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState('');

    useEffect(() => {
        userRef.current;
    }, [])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(username));
    }, [username])

    useEffect(() => {
        setErrMsg('');
    }, [username, password])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosClient.post(
                LOGIN_URL,
                JSON.stringify({ username, password }),
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const refreshToken = response?.data?.refreshToken;
            const roles = response?.data?.roles;
            setAuth({ username, password, roles, accessToken, refreshToken });
            setUsername('');
            setPassword('');
            setSuccess(true);
            navigate(from, {replace: true});

        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 403) {
                setErrMsg(err.response.data.detail);
            } else if (err.response?.status === 401) {
                setErrMsg(err.response.data.detail);
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus;
        }
        console.log('Email:', username);
        console.log('Password:', password);
    };

    return (
        <div className="login-container">
            {success ? (
                    <section>
                        <h1>Success!</h1>
                        <p>
                            Redirection !
                        </p>
                    </section>):
                (
                    <form className="login-form" onSubmit={handleSubmit}>
                        <h2>Login to your account</h2>
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="you@example.com"
                                autoComplete="off"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                autoComplete="off"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="login-button">Login</button>
                        <div className="login-links">
                            <a href="/forgot-password">Forgot password?</a>
                            <Link to="/signup">Create an account</Link>
                        </div>
                    </form>)}
        </div>
    );
}
