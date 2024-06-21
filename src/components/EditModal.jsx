import React from "react";
import '../styles/imports/Modal.css'
import logoImage from '../assets/logo.png'

const Update = ({closeUpdate}) => {
    return <>  
    <div className="modal-wrapper"></div>
            <div className="modal-container">
        <div className="inputContainer">
            <form>
                <div className="logoContainer">
                    <img style={{ height: '80px', marginBottom: '10px' }} className="logoImage" src={logoImage} alt="logoImage" />
                </div>
                <div className="inputFields">
                    <h3>Bio</h3>
                    <input
                        className="input dimension"
                        name="phone"
                        type="number"
                        // onChange={handleInputChange}
                        placeholder="User Name"
                        required />
                    <input
                        className="input dimension"
                        name="phone"
                        type="number"
                        // onChange={handleInputChange}
                        placeholder="Email"
                        required />
                    <input
                        className="input dimension"
                        name="phone"
                        type="number"
                        // onChange={handleInputChange}
                        placeholder="Phone Number"
                        required />
                    <input
                        className="input dimension"
                        name="location"
                        type="text"
                        // onChange={handleInputChange}
                        placeholder="Favourite Location"
                        required />
                    <input
                        className="input dimension"
                        type="text"
                        name="vehicle"
                        // onChange={handleInputChange}
                        placeholder="Preferred Vehicle"
                        required
                    />
                    <input
                        className="input dimension"
                        type="text"
                        name="bio"
                        // onChange={handleInputChange}
                        placeholder="Something About You"
                        required
                    />
                    <input
                        className="input dimension"
                        type="text"
                        name="image"
                        // onChange={handleInputChange}
                        placeholder="Enter image Url"
                        required
                    />
                    <button onClick={closeUpdate} type="btn" className="btn">Finish</button>
                </div>
            </form>
        </div>
    </div>
    </>
}

export default Update