import React,{useState, useEffect} from "react";
import SideFilterBar from "../components/SideFilterBar";
import Trip from "../components/trip";
import BottomNavbar from "../components/BottomNavbar";
import {getCookieValue} from '../components/cookieFunc'

const CommunityTrips = () => {

    const [filterData, setFilterData] = useState({
        origin:'',
        destination:'',
        date:'',
        timeRangeStartTime:'',
        timeRangeEndTime:''
    })

    const handleFilterData = (value) => {
        setFilterData(value);
    }

    const { origin, destination, date, timeRangeEndTime, timeRangeStartTime } = filterData;

    const getCommunityTripsUrl = `http://localhost:4000/communities/5/trips?origin=${origin}&destination=${destination}&date=${date}&timeRangeStartTime${timeRangeStartTime}&timeRangeEndTime=${timeRangeEndTime}`;
    const [trips, setTrips] = useState([]);

    const authToken = getCookieValue(document.cookie, 'authtoken');

    useEffect(()=>{
        fetchAllTrips();
    },[])

    const fetchAllTrips = async () =>{
        try {
            const response = await fetch(getCommunityTripsUrl,{
                method:'GET',
                headers:{
                    'auth-token':authToken,
                    'Content-Type':'application/json',
                }
            })

            if(response.ok)
            {
                const json = await response.json();
                setTrips(json.result);
            }
        } catch (error) {
            console.log("error while fetching the trips:",error);
        }
    }

    return(
        <>
        <div className="mainCommunityTripContainer">
            <SideFilterBar handleFilterData = {handleFilterData} fetchAllTrips = {fetchAllTrips}/>
            <h3>Community Trips</h3>
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

export default CommunityTrips