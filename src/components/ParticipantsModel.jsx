import React, {useState, useEffect} from "react";
import {getCookieValue} from './cookieFunc'
import Participants from './Participants'

const TripParticipants = ({closeModal, url, urlDecides,showBtn}) => {
    const getParticipantsUrl = url;
    const [participants, setParticipants] = useState([]);
    const authToken = getCookieValue(document.cookie,'authtoken');
    useEffect(()=>{
        fetchParticipants();
    },[])

    let firstBtn = urlDecides ? "Accept" : "More Info";
    let secondBtn = urlDecides ? "Reject" : "Add Friend";
    let heading = urlDecides ? "Trip Join Requests" : "Participants"

    const fetchParticipants = async () => {
        try {
            const response = await fetch(getParticipantsUrl, {
                method: 'GET',
                headers:{
                    'auth-token':authToken,
                    'Content-Type':'application/json',
                }
            })

            if(response.ok)
            {
                const json = await response.json();
                setParticipants(json.results);
            }
        } catch (error) {
            console.log(error);
        }
    }
        return (
            <>
            <div className="modal-wrapper" onClick={closeModal}></div>
            <div className="modal-container">
                <p className="participant">{heading}</p>
                {participants && participants.map((ele) => {
                    return <div>
                        <Participants showBtn = {urlDecides} user_id = {ele.user_id} firstBtn = {firstBtn} secondBtn = {secondBtn} image = {ele.user_profile_photo} name = {ele.user_name} email = {ele.user_email}/>
                    </div>
                })}   
                <button style={{height:'auto', width:'auto',borderRadius:'0.6svw', backgroundColor:'#005fc2', cursor:"pointer", padding:'0.4vw'}} onClick={closeModal}><p className="text fontSize3">Close</p></button>
            </div>
            
        </>
        )
}

export default TripParticipants;