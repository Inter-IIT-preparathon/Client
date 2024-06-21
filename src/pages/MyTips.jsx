import React, {useEffect, useState} from "react";
import CreateTripBar from "../components/createTripBar";
import Trip from "../components/trip";
import BottomNavbar from "../components/BottomNavbar";
import { useNavigate } from "react-router-dom";
const {getCookieValue} = require('../components/cookieFunc')

const MyTrip = () => {

    const authToken = getCookieValue(document.cookie, 'authtoken');
    const navigate = useNavigate();
    useEffect(()=>{
        if(!authToken)
        {
          navigate('/');
        }
      })
    const [trips, setTrips] = useState([]);
    const [createTrip, setCreateTrip] = useState({
        name:'',
        origin:'',
        destination:'',
        arrival_dateTime:'',
        departure_dateTime:'',
        desc:''
    });
    
    const setCreateTripData = (value) => {
        setCreateTrip(value);
    }

    const myTripUrl = `http://localhost:4000/trips/myTrips`;

    useEffect(() =>{
        fetchAllMyTrips();
    },[])

    const fetchAllMyTrips = async () => {
        const headers = {
            'auth-token':authToken,
            'Content-Type':'application/json'
        }

        const response = await fetch(myTripUrl,{
            method:'GET',
            headers:headers
        })

        if(response.ok)
        {
            const allParsedtrips = await response.json();
            setTrips(allParsedtrips.result);
        }
        else
        {
            console.log("error occured while fetching all your trips:",response.status);
        }
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const createTripUrl = `http://localhost:4000/trips`;

        try {
            const response = await fetch(createTripUrl,{
                method:'POST',
                headers:{
                    'auth-token':authToken,
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(createTrip),
            })

            if (response.ok) 
            {
                console.log("trip created successfully!!")
            }
            else
            {
                console.log("error creating the trip:",response.status);
            }   
            
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <>
        <div className="AllTripsContainer">
        <CreateTripBar setCreateTripData = {setCreateTripData} handleSubmit={handleSubmit}/>
        <p style={{fontSize:'1.5vw', fontWeight:'bold'}}>My Trips</p>
        <div style={{marginBottom:'4vw'}}>
          {trips.map((ele) => {
            return <div style={{marginBottom:'2.5vh'}} key={"AllTripsId_"+ele.trip_id}>
              <Trip trip_id={ele.trip_id} userName={ele.user_name} userImage={ele.user_profile_photo} origin = {ele.trip_origin} destination = {ele.trip_destination} desc = {ele.trip_desc} arrival = {ele.trip_arrival_datetime} departure = {ele.trip_departure_datetime}/>
            </div>
          })}
          </div>
        </div>
        <footer className="footer">
        <BottomNavbar/>
        </footer>
        </>
    )
}

export default MyTrip