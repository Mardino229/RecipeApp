import React, {useEffect, useRef, useState} from "react";
import axiosClient from "../../services/axios.jsx";
import {NEW_MDP_URL, RESET_MDP_URL} from "../../constants/index.jsx";
import {PWD_REGEX} from "../../constants/index.jsx";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faInfoCircle, faTimes} from "@fortawesome/free-solid-svg-icons";

function ForgotPassword (){

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();



    const [username, setUsername] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const userRef = useRef();
    const errRef = useRef();

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(password));
    }, [password])

    const resetMyPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosClient.post(
                RESET_MDP_URL,
                JSON.stringify({ username }),
            );
            console.log(JSON.stringify(response?.data));
            setErrMsg('');
            setSuccess(true);

        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            }
            else if (err.response?.status === 403) {
                setErrMsg(err.response.data.detail);
            }
            errRef.current.focus;
        }
        console.log('Email:', username);
    };
    const resetPasswordConfirm = async (e) => {
        e.preventDefault();
        const v = PWD_REGEX.test(password);
        if (!v) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axiosClient.post(
                NEW_MDP_URL,
                JSON.stringify({ username, code, password }),
            );
            console.log(JSON.stringify(response?.data));
            setPassword('')
            setUsername('')
            setCode('')
            navigate('/login');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 403) {
                setErrMsg(err.response.data.detail);
            }
            errRef.current.focus;
        }
    };
    return(
        <div className="login-container">
            {success ?
                <form className="login-form" onSubmit={resetPasswordConfirm}>
                    <h2>Enter code of validation</h2>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <div className="form-group">
                        <label htmlFor="email">Code:</label>
                        <input
                            type="number"
                            id="code"
                            value={code}
                            placeholder="Enter code here"
                            autoComplete="off"
                            ref={userRef}
                            required
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Nouveau mot de passe:
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"}/>
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !password ? "hide" : "invalid"}/>
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            placeholder="New password"
                            autoComplete="off"
                            ref={userRef}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                            onChange={(e) => setPassword(e.target.value)}
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
                    <button type="submit" className="login-button">Confirm reset</button>
                </form> :
                <form className="login-form" onSubmit={resetMyPassword}>
                    <h2>Password reset</h2>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="you@example.com"
                            autoComplete="off"
                            ref={userRef}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">Get reset code</button>
                </form>
            }
        </div>
    )
}

export default ForgotPassword;