import React, {useState} from "react";
import searchIcon from '../assets/search-interface-symbol.png';

const SideFilterBar = ({handleFilterData, fetchAllTrips}) => {

    const [inputData, setInputData] = useState({
        origin:'',
        destination:'',
        date:'',
        timeRangeStartTime:'',
        timeRangeEndTime:''
    })

    const handleInputChange = async (event) => {
        const {name, value} = event.target
        setInputData({
            ...inputData,
            [name]: value,
        })
        await handleFilterData({
            ...inputData,
            [name]: value,
        });
    }

    return(
        <>
         <div className="mainFilterContainer">
            <p style={{color: 'white', fontSize:'1.7vw'}}>Search For a Trip</p>
            <div className="tripInputContainer">
                <input name="origin" onChange={handleInputChange} className="tripInput leftTripInput" type="text" placeholder="Origin"/>
                <input name="destination" onChange={handleInputChange} className="tripInput" type="text" placeholder="Destination"/>
                <input name="date" onChange={handleInputChange} className="tripInput" type="date" placeholder="Date"/>
                <div>
                    <div style={{display:'flex'}}>
                        <input name="timeRangeStartTime" onChange={handleInputChange} className="tripInput" type="text" placeholder="from time"/>
                        <input name="timeRangeEndTime" onChange={handleInputChange} className="tripInput rightTripInputContainer" type="text" placeholder="to time"/>
                    </div>
                    <p style={{padding:'0', margin:'0', position:'absolute', fontSize:'1vw'}}>Input time range between which you are searching for trip</p>
                </div>
                <div className="search" onClick={fetchAllTrips} style={{cursor:'pointer'}}>
                    <img onClick={fetchAllTrips} style={{height:'2vw'}} src={searchIcon} alt="search" />
                </div>
            </div>
         </div>
        </>
    )
}

export default SideFilterBar;