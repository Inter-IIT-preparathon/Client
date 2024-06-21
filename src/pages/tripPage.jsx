import React, {useState, useEffect} from "react";
import BottomNavbar from "../components/BottomNavbar";
import '../styles/imports/Trip.css';
import ProfilePicture from '../assets/Profile.jpeg'
import messsage from '../assets/message.png'
import {getCookieValue} from '../components/cookieFunc'
import TripParticipants from '../components/ParticipantsModel'
import { useNavigate, useParams } from "react-router-dom";

const TripPage = () => {

    const {trip_id} = useParams();
    console.log(trip_id);
    const navigate = useNavigate();
    const authToken = getCookieValue(document.cookie,'authtoken');
    useEffect(()=>{
        if(!authToken)
        {
          navigate('/');
        }
      })
    console.log(authToken);
    const userDataCookie = getCookieValue(document.cookie,'data');
    const userData = JSON.parse(decodeURIComponent(userDataCookie));
    const auth_user_id = userData.user.id;
    const [urlDecides, setUrlDescider] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const getTripDataUrl = `http://localhost:4000/trips/${trip_id}`;
    const [trips, setTrips] = useState([]);
    const [showBtn, setShowBtn] = useState(false);
    const participantUrl = `http://localhost:4000/trips/${trip_id}/participants`;
    const requestUrl = `http://localhost:4000/trips/${trip_id}/join_requests`;
    const url = urlDecides ? requestUrl : participantUrl;

    useEffect(() => {
        const isCreator = trips.some((ele) => ele.user_id === auth_user_id);
        setShowBtn(isCreator);
      }, [trips, auth_user_id]);

    const handleShosModal = () => {
        setShowModal(true);
        setUrlDescider(false);
    }

    const handleShowModal = () => {
        setShowModal(true);
        setUrlDescider(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    useEffect(() => {
        fetchTrip();
    },[])

    const fetchTrip = async () => {
        try {
            const response = await fetch(getTripDataUrl,{
                method:'GET',
                headers:{
                    'auth-token':authToken,
                    'Content-Type':'application/json',
                },
            })

            if(response.ok)
            {
                const json = await response.json();
                setTrips(json.result);
            }
            else
            {
                console.log("error occured while setting the value of the trip:",response.status);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
        {trips.map((ele) => {
              
            return <div className="mainTripPageContainer">
            <div className="mainProfilePicContainer">
                <div className="TopContainer">
                    <div className="imageBox">
                        <img className="profileImg" style={{borderRadius: '50%', height: '8vw'}} src={ele.user_profile_photo ? ele.user_profile_photo: ProfilePicture} alt="ProfilePicture" />
                    </div>
                    <div className="TripCreatorInfoBox">
                        <p className="mediumSizeTag">Trip Creator Name : {ele.user_name}</p>
                        <p className="smallTag">Trip Creator Email : {ele.user_email}</p>
                        <img style={{width: '2.5vw'}} src={messsage} alt="message" />
                    </div>
                    {showBtn && <div className="ButtonBox">
                        <button onClick = {handleShowModal} className="seeParticipantsBtn"><p className="smallTag">Join Requests</p></button>
                    </div>}
                    <div className="ButtonBox">
                        <button onClick = {handleShosModal} className="seeParticipantsBtn"><p className="smallTag">See Paticipants</p></button>
                    </div>
                </div>
                <div className="rightContainer">
                    <div style={{display:"flex", flexDirection:'row'}}>
                        <div className="smallLeftContainer">
                            <p className="mediumSizeTag">Trip Name :</p>
                            <p className="mediumSizeTag">Trip Origin :</p>
                            <p className="mediumSizeTag">Trip Destination :</p>
                            <p className="mediumSizeTag">Trip Start Date/Time :</p>
                            <p className="mediumSizeTag">Trip End Date/Time :</p>
                        </div>
                        <div className="smallrightContainer">
                            <p className="mediumSizeTag">{ele.trip_name}</p>
                            <p className="mediumSizeTag">{ele.trip_origin}</p>
                            <p className="mediumSizeTag">{ele.trip_destination}</p>
                            <p className="mediumSizeTag">{ele.trip_departure_datetime}</p>
                            <p className="mediumSizeTag">{ele.trip_arrival_datetime}</p>
                        </div>
                    </div>
                    <div className="descriptionContainer">
                        <p className="headingStyle">Description</p>
                        <p style={{marginLeft:'1vw', fontSize:'1vw', fontFamily:'cursive'}}>{ele.trip_desc}</p>
                    </div>
                </div>
            </div>
            <div className="BottonNavbar">
                <BottomNavbar/>
            </div>
            <div>
                {showModal && <TripParticipants showBtn = {showBtn} urlDecides = {urlDecides} url = {url} closeModal = {closeModal}/>}
            </div>
        </div>
        })}
        </>
    )
}

export default TripPage;