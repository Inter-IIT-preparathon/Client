import React, { useState ,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/imports/auth.css'
import authImage from '../assets/signup1.jpg'
import logoImage from '../assets/logo.png'
import { getCookieValue } from "../components/cookieFunc";
import Alert from "../components/Alert";

const Bio = () => {
    
    const navigate = useNavigate();
    const [alert, setAlert] = useState(true);
    const [loginAlert, setLoginAlert] = useState(false);
    const authToken = getCookieValue(document.cookie, 'authtoken');
    // useEffect(() => {
    //     // Check if the user is already authenticated and redirect if necessary
    //     if (authToken) {
    //         navigate('/myProfile');
    //     }
    // }, [authToken, navigate]);
    const url = 'http://localhost:4000/users/bio';

    useEffect(() => {
        setTimeout(() => {
            setAlert(false);
        }, 2000);
    },[])

    let requestData = {};

    const [formData, setFormData] = useState({
        phone: 0,
        location: '',
        vehicle: '',
        bio: '',
        image: ''
    })

    const {phone, location, vehicle, bio, image} = formData;

    requestData = {
        phone,
        location,
        vehicle,
        bio,
        image
    }

    console.log("stringified data is:",JSON.stringify(requestData));

    console.log("data is:",requestData)

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(url,{
               method:"POST",
               headers:{
                    'Content-Type':'application/json',
                    'auth-token':  authToken,
               },
               body: JSON.stringify(requestData)
            })

            if(response.ok){
                console.log("bio entered successfully");

                navigate('/', { state: { signedUp: true } });

            }
            else
            {
                console.log("Unable to enter bio")
            }
        } catch (error) {
            console.log("error while entering bio:",error);
        }
    }

    return (
        <>
            <div>
                {alert && <Alert msg = {"Sign Up successful!"}/>}
                <div className="mainContainer">
                    <div className="imageContainer" style={{ backgroundColor: "black" }}>
                        <img className="imageContainer" src={authImage} alt="authImage" />
                    </div>
                    <div className="inputContainer">
                        <form onSubmit={handleSubmit}>
                            <div className="logoContainer">
                                <img style={{ height: '80px', marginBottom: '10px' }} className="logoImage" src={logoImage} alt="logoImage" />
                            </div>
                            <div className="inputFields">
                            <h3>Bio</h3>
                                <input
                                    className="input dimension"
                                    name="phone"
                                    type="number"
                                    onChange={handleInputChange}
                                    placeholder="Phone Number"
                                    required />
                                <input
                                    className="input dimension"
                                    name="location"
                                    type="text"
                                    onChange={handleInputChange}
                                    placeholder="Favourite Location"
                                    required />
                                <input
                                    className="input dimension"
                                    type="text"
                                    name="vehicle"
                                    onChange={handleInputChange}
                                    placeholder="Preferred Vehicle"
                                    required
                                />
                                <input
                                    className="input dimension"
                                    type="text"
                                    name="bio"
                                    onChange={handleInputChange}
                                    placeholder="Something About You"
                                    required
                                />
                                <input
                                    className="input dimension"
                                    type="text"
                                    name="image"
                                    onChange={handleInputChange}
                                    placeholder="Enter image Url"
                                    required
                                />
                                <button type="submit" className="btn">Finish</button>
                            </div>
                          </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Bio;