import React, {useState, useEffect} from "react";
import BottomNavbar from "../components/BottomNavbar";
import Slider from "../components/Carousel";
import { getCookieValue } from "../components/cookieFunc";

const Notifications = () => {

    const getAllTripInvites = `http://localhost:4000/users/43/trip_invites`;
    const authToken = getCookieValue(document.cookie, 'authtoken');
    const [invites, setInvites] = useState([]);
    const [data, setData] = useState([]);
    const [bio, setBio] = useState([]);

    useEffect(()=> {
        fetchAllInvites();
    },[])

    const fetchAllInvites = async() => {
        try {
            const response = await fetch(getAllTripInvites,{
                method:'GET',
                headers:{
                    'auth-token':authToken,
                    'Content-Type':'application/json'
                }
            })

            if(response.ok)
            {
                const json = await response.json();
                setInvites(json.resulta);
                setData(json.results);
                setBio(json.result);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
        <div style={{paddingBottom:'4vw', marginTop:'1vw'}} className="mainProfileContainer">
            <p style={{fontSize:'2vw', fontFamily:'cursive', margin:'0', padding:'0', paddingTop:'2vw'}}>Notifications</p>
            <div className="headingContainer">
                <p className="Heading">Trip Invites</p>
                <button className="HeadingBtn"><p className="btnText">See All</p></button>
            </div>
            <div style={{margin:'1vw'}} className="communityContainer">
                <Slider tripInvites={invites} userData = {data} userBio = {bio}/>
            </div>
            <div className="headingContainer">
                <p className="Heading">Community Invites</p>
                <button className="HeadingBtn"><p className="btnText">See All</p></button>
            </div>
            <div style={{margin:'1vw'}} className="communityContainer">
                <Slider/>
            </div>
            <div className="headingContainer">
                <p className="Heading">Friend Requests</p>
                <button className="HeadingBtn"><p className="btnText">See All</p></button>
            </div>
            <div style={{margin:'2vw'}} className="communityContainer">
                <Slider/>
            </div>
        </div>
        <footer className="footer">
        <BottomNavbar/>
        </footer>
        </>
    )
}

export default Notifications