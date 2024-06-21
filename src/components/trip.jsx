import React, {useState, useEffect} from "react";
import Profile from '../assets/Profile.jpeg'
import Modal from "./Modal";
import { getCookieValue } from "./cookieFunc";
import { useNavigate } from "react-router-dom";

const Trip = ({ origin, destination, desc, arrival, departure, userName, userImage, trip_id}) => {
    const navigate = useNavigate();
    const tripJoinRequestUrl = `http://localhost:4000/users/43/trips/joinRequest`;
    const AuthToken = getCookieValue(document.cookie, 'authtoken');
    const [showModal, setShowModal] = useState(false);
    const [partOfTrip, setPartOfTrip] = useState([]); 
    const [showText, setShowText] = useState(false);
    const closeShowModal = () =>{
        return setShowModal(false);
    } 
    const userParticipantUrl = `http://localhost:4000/trips/userParticipant`;
    const ArrivalDate = arrival;
    const DepartureDate = departure;
    const ArrivalDateObj = new Date(ArrivalDate);
    const DepartureDateObj = new Date(DepartureDate);

    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const newArrival = ArrivalDateObj.toLocaleDateString(undefined, options);
    const newDeparture = DepartureDateObj.toLocaleDateString(undefined, options);

    const requestBody = {
        trip_id: trip_id
    }

    const fetchUserParticipant = async () => {
        try {
            const response = await fetch(userParticipantUrl, {
                method: 'GET',
                headers: {
                    'auth-token':AuthToken,
                    'Content-Type':'application/json'
                }
            })

            if(response.ok)
            {
                const json = await response.json();
                
                setPartOfTrip(json.results);
            }
            else
            {
                console.log("Unecpected error occured:",response.status);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchUserParticipant();
    },[])

    const makeTripJoinRequests = async () => {
        try {
            const response = await fetch(tripJoinRequestUrl,{
                method: 'POST',
                headers: {
                    'auth-token':AuthToken,
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(requestBody)
            })

            if(response.ok)
            {
                console.log("request made successfully!");
                setShowTextF();
            }
            else
            {
                setShowText(true);
                console.log("error occured while making request:",response.status);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const setShowTextF = () => {
        setShowText(false);
    }

    const openTripPage = () => {
        navigate(`/trips/${trip_id}`);
    }

    let usersSet = new Set();
    partOfTrip.map((ele) => {
        usersSet.add(ele.trip_id);
    })

    let bool = usersSet.has(trip_id) ? true : false;
  
    return(
        <>
        <div className="mainTripContainer">
            <div className="TripImageContainer">
                <img style={{borderRadius: '30px', width:'7.5vw', margin:'3vw'}} src={userImage ? userImage : Profile} alt="Profile" />
            </div>
            <div className="TripCreatorNameContainer">
                <p style={{fontSize:'1.5vw', fontFamily:'sans-serif'}}>Posted By</p>
                <p style={{fontSize:'1.3vw', fontFamily:'sans-serif'}}>{userName}</p>
            </div>
            <div className="TripInfoContainer">
                <span><p style={{fontFamily:'sans-serif',fontSize:'1vw'}}>From : {origin}</p><p style={{fontFamily:'sans-serif',fontSize:'1vw'}}>To : {destination}</p><p style={{fontFamily:'sans-serif',fontSize:'1vw'}}>Starting Date/Time : {newArrival}</p><p style={{fontFamily:'sans-serif',fontSize:'1vw'}}>End Date/Time : {newDeparture}</p></span>
            </div>
            <div className="Info"></div>
            <div className="ButtonsContainer">
                {showText && <p>Trip join request made successfully!!</p>}
                <button style={{margin: '0.7vw', height: '3vw', width: '6vw', borderRadius: '8px', backgroundColor: '#93c7fd', cursor: "pointer", border:'0px', paddingTop:'0.8vw'}} onClick={()=>setShowModal(true)}><p className="buttonText">Info</p></button>
                {!bool && <button style={{margin: '0.7vw', height: '3vw', width: '6vw', borderRadius: '8px', backgroundColor: '#005fc2', cursor:'pointer', border:'0px', paddingTop:'0.8vw'}}><p className="buttonText" onClick={makeTripJoinRequests}>Join</p></button>} 
                {bool && <button style={{margin: '0.7vw', height: '3vw', width: '6vw', borderRadius: '8px', backgroundColor: '#6FFF89', cursor:'pointer', border:'0px', paddingTop:'0.8vw'}}><p className="buttonText" onClick={openTripPage}>Open</p></button>}
            </div>
            
        </div>
        {showModal && <Modal closeModal = {closeShowModal} desc = {desc}/>}
        </>
    )
}

export default Trip