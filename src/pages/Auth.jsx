import React, { useState, useEffect } from "react";
import '../styles/imports/auth.css';
import Cookies from "universal-cookie";
import authImage from '../assets/signup1.jpg';
import logoImage from '../assets/logo.png';
import gSignIn from '../assets/googleSignIn.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getCookieValue } from "../components/cookieFunc";
import Alert from "../components/Alert";

const Auth1 = () => {
    const authToken = getCookieValue(document.cookie, 'authtoken');
    const navigate = useNavigate();
    // const [alert, setAlert] = useState(false);
    useEffect(() => {
        // Check if the user is already authenticated and redirect if necessary
        if (authToken) {
            navigate('/myProfile');
        }
    }, [authToken, navigate]);
    const cookies = new Cookies();
    const location = useLocation();
    const signedUp = location.state?.signedUp;

    let alert = signedUp ? true : false;
    
    const signUpUrl = 'http://localhost:4000/users';
    const loginUrl = 'http://localhost:4000/login';
    const googleSignUpUrl = 'http://localhost:4000/auth/google';

    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { name, email, password, confirmPassword } = formData;
    const [passwordMatchError, setPasswordMatchError] = useState(false);

    let requestData = {};

    if (isSignUp) {
        requestData = {
            name,
            email,
            password,
        };
    } else {
        requestData = {
            email,
            password,
        };
    }

    const url = isSignUp ? signUpUrl : loginUrl;

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const handleSignUp = async (event) => {
        event.preventDefault();

        // Check if password and confirmPassword match
        if (isSignUp && password !== confirmPassword) {
            setPasswordMatchError(true);
            return;
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (response.ok) {
                const json = await response.json();
                const authToken = json.authToken;
                const data = json.data;
                cookies.set('authtoken', authToken);
                cookies.set('data', data);
                // Redirect to the /Bio endpoint
                if(isSignUp)
                {
                    navigate('/Bio');
                }else
                {
                    navigate('/myProfile');
                }

            } else {
                console.log('signUp failed');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const swithSignUpMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    }

    return (
        <div>
            {alert && <Alert msg = {"Bio entered successfully Kindly login to continue!"}/>}
            <div className="mainContainer">
                <div className="imageContainer" style={{ backgroundColor: "black" }}>
                    <img className="imageContainer" src={authImage} alt="authImage" />
                </div>
                <div className="inputContainer">
                    <div>
                        <div className="logoContainer">
                            <img style={{ height: '80px', marginBottom: '10px' }} className="logoImage" src={logoImage} alt="logoImage" />
                        </div>
                        <div className="inputFields">
                            <form style={{ display: "flex", flexDirection: 'column' }} onSubmit={handleSignUp}>
                                {isSignUp && (
                                    <input
                                        className="input dimension"
                                        name="name"
                                        type="text"
                                        placeholder="Username"
                                        onChange={handleInputChange}
                                        required />
                                )}
                                <input
                                    className="input dimension"
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    onChange={handleInputChange}
                                    required />
                                <input
                                    className="input dimension"
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    onChange={handleInputChange}
                                    required
                                />
                                {isSignUp && (
                                    <input
                                        className="input dimension"
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirm Password"
                                        onChange={handleInputChange}
                                        required
                                    />
                                )}
                                {passwordMatchError && (
                                    <p className="error-message">Passwords and Confirm password must be same</p>
                                )}
                                <button type="submit" className="btn">{isSignUp ? "Sign Up" : "Sign In"}</button>
                            </form>
                            <p>
                                {isSignUp
                                    ? "Already have an account ?"
                                    : "Don't have an account ?"
                                }
                                <span style={{ cursor: 'pointer' }} onClick={swithSignUpMode}>
                                    {isSignUp ? ' Sign In' : ' Sign Up'}
                                </span>
                            </p>
                        </div>
                        <div className="OrContainer input">
                            <div className="horizontalLine input" style={{ margin: '8px' }}></div>
                            OR
                            <div className="horizontalLine" style={{ margin: '8px' }}></div>
                        </div>
                        <div className="googleSignUpContainer">
                            <Link to={googleSignUpUrl}>
                                <img src={gSignIn} style={{ height: '6vh', margin: '8px', cursor: 'pointer' }} alt="" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth1;