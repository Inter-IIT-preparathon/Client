import React, { useState } from "react";
import ProfilePicture from '../assets/Profile.jpeg'
import { getCookieValue } from "./cookieFunc";

const Participants = ({name, email, image, firstBtn, secondBtn, user_id, showBtn}) => {
    
    const authToken = getCookieValue(document.cookie, 'authtoken')
    const [visible, setVisible] = useState(true);
    const allowordenyTripJoinrequests = `http://localhost:4000/users/43/trips/45`;
    const requestBody ={
        user_id: user_id,
        allow: true
    }

    const newRequestBody ={
        user_id: user_id,
        allow: false
    }

    const acceptRequest = () => {
        allowTripJoinRequests();
        setVisible(false);
    }

    const denyRequest = () => {
        denyTripJoinRequests();
        setVisible(false);
    }

    const allowTripJoinRequests = async () => {
        try {
           const response = await fetch(allowordenyTripJoinrequests, {
                method:'POST',
                headers:{
                    'auth-token':authToken,
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(requestBody)
           }) 
           if(response.ok)
           {
                console.log("join request accepted!");
           }
           else
           {
                console.log("error occures while accepting the request")
           }
        } catch (error) {
            console.log(error);
        }
    }

    const denyTripJoinRequests = async () => {
        try {
           const response = await fetch(allowordenyTripJoinrequests, {
                method:'POST',
                headers:{
                    'auth-token':authToken,
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(newRequestBody)
           }) 
           if(response.ok)
           {
                console.log("join request denied!");
           }
           else
           {
             console.log("error occures while accepting the request")
           }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            {visible && <div className="participantsContainer">
                <div>
                    <img className="profilePicContainer" src={image ? image : ProfilePicture} />
                </div>
                <div style={{ display: "flex", flexDirection: 'column' }}>
                    <p className="text fontSize" style={{ marginBottom: '0.8vw' }}>Name</p>
                    <p className="text fontSize">email</p>
                </div>
                <div style={{ display: "flex", flexDirection: 'column' }}>
                    <p className="text fontSize" style={{ marginBottom: '0.8vw' }}>{name}</p>
                    <p className="text fontSize" >{email}</p>
                </div>
                <div>
                    <button style={{ height: 'auto', width: 'auto', borderRadius: '15px', backgroundColor: '#005fc2', cursor: "pointer", margin: '1vw', padding: '0.3vw' }}><p className="text fontSize2" onClick={showBtn ? acceptRequest : ''}>{firstBtn}</p></button>
                    <button style={{ height: 'auto', width: 'auto', borderRadius: '15px', backgroundColor: '#005fc2', cursor: "pointer", padding: '0.3vw' }}><p className="text fontSize2" onClick={showBtn ? denyRequest : ''}>{secondBtn}</p></button>
                </div>
            </div>
            }
        </>
    )
}

export default Participants