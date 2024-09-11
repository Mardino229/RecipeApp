import React, { useState, useEffect, useRef } from 'react';
import axiosClient from "../../services/axios.jsx";
import {faCheck, faTimes, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {Link, useNavigate} from "react-router-dom";
import {PWD_REGEX, USER_REGEX, EMAIL_REGEX, REGISTER_URL} from "../../constants/index.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function signup() {

    const userRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();

    const [pseudo, setPseudo] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(pseudo));
    }, [pseudo])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(password));
        setValidMatch(password === matchPwd);
    }, [password, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [pseudo, password, matchPwd])



    const handleSubmit = async (e) => {
        e.preventDefault();

        const v1 = USER_REGEX.test(pseudo);
        const v2 = EMAIL_REGEX.test(email);
        const v3 = PWD_REGEX.test(password);
        if (!v1 || !v2 || !v3) {
            setErrMsg("Invalid Entry");
            return;
        }

        try {
            const response = await axiosClient.post(REGISTER_URL,
                JSON.stringify({pseudo, email, password}),
                {
                    withCredentials: true
                }
            );
            console.log(response?.data);
            console.log(JSON.stringify(response))
            setSuccess(true);
            //clear state and controlled inputs
            //need value attrib on inputs for this
            setPseudo('');
            setPassword('');
            setEmail('')
            setMatchPwd('');
            navigate('/login');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            }else if (err.response?.status === 403) {
                setErrMsg(err.response.data.detail);
            }else {
                setErrMsg('Registration Failed')
            }
            errRef.current;
        }
    };

    return (
        <div className="login-container signup">
            {success ? (
                    <section>
                        <h1>Success!</h1>
                        <p>
                            <Link to="/login">Cliquez ici pour activer votre compte</Link>
                        </p>5
                    </section>):
                (<form className="login-form" onSubmit={handleSubmit}>
                    <h2>Signup</h2>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <div className="flex">
                        <div className="inputgroup">
                            <div className="form-group">
                                <label htmlFor="name">
                                    Pseudo:
                                    <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"}/>
                                    <FontAwesomeIcon icon={faTimes}
                                                     className={validName || !pseudo ? "hide" : "invalid"}/>
                                </label>
                                <input
                                    type="name"
                                    id="name"
                                    ref={userRef}
                                    placeholder="your pseudo-chef"
                                    autoComplete="off"
                                    value={pseudo}
                                    onChange={(e) => setPseudo(e.target.value)}
                                    aria-invalid={validName ? "false" : "true"}
                                    aria-describedby="uidnote"
                                    onFocus={() => setUserFocus(true)}
                                    onBlur={() => setUserFocus(false)}
                                    required
                                />
                                <p id="uidnote"
                                   className={userFocus && pseudo && !validName ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle}/>
                                    4 to 24 characters.<br/>
                                    Must begin with a letter.<br/>
                                    Letters, numbers, underscores, hyphens allowed.
                                </p>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">
                                    Email:
                                    <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"}/>
                                    <FontAwesomeIcon icon={faTimes}
                                                     className={validEmail || !email ? "hide" : "invalid"}/>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    ref={userRef}
                                    placeholder="you@example.com"
                                    autoComplete="off"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    aria-invalid={validEmail ? "false" : "true"}
                                    aria-describedby="mailnote"
                                    onFocus={() => setEmailFocus(true)}
                                    onBlur={() => setEmailFocus(false)}
                                    required
                                />
                                <p id="mailnote"
                                   className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle}/>
                                    Put a mail valid<br/>
                                </p>
                            </div>
                        </div>
                        <div className="inputgroup">
                            <div className="form-group">
                                <label htmlFor="password">
                                    Password:
                                    <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"}/>
                                    <FontAwesomeIcon icon={faTimes}
                                                     className={validPwd || !password ? "hide" : "invalid"}/>
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    aria-invalid={validPwd ? "false" : "true"}
                                    aria-describedby="pwdnote"
                                    onFocus={() => setPwdFocus(true)}
                                    onBlur={() => setPwdFocus(false)}
                                />
                                <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle}/>
                                    8 to 24 characters.<br/>
                                    Must include uppercase and lowercase letters, a number and a special character.<br/>
                                    Allowed special characters: <span aria-label="exclamation mark">!</span> <span
                                    aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span
                                    aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                                </p>
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirm-password">
                                    Confirm Password:
                                    <FontAwesomeIcon icon={faCheck}
                                                     className={validMatch && matchPwd ? "valid" : "hide"}/>
                                    <FontAwesomeIcon icon={faTimes}
                                                     className={validMatch || !matchPwd ? "hide" : "invalid"}/>
                                </label>
                                <input
                                    type="password"
                                    placeholder="Confirm-Password"
                                    id="confirm_pwd"
                                    onChange={(e) => setMatchPwd(e.target.value)}
                                    value={matchPwd}
                                    required
                                    aria-invalid={validMatch ? "false" : "true"}
                                    aria-describedby="confirmnote"
                                    onFocus={() => setMatchFocus(true)}
                                    onBlur={() => setMatchFocus(false)}
                                />
                                <p id="confirmnote"
                                   className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle}/>
                                    Must match the first password input field.
                                </p>
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className={(!validName || !validPwd || !validMatch) ? "login-button disable sign" : "login-button sign"}
                        disabled={!validName || !validPwd || !validMatch}
                    >
                        Sign up
                    </button>
                    <div className="login-links">
                        <p>Already account?</p>
                        <Link to="/login">Login</Link>
                    </div>
                </form>)}
        </div>
    );
}
