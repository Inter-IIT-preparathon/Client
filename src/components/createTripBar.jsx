import React, {useState} from "react";
import ModalInputBox from "./ModalInputBox";

const CreateTripBar = ({handleSubmit, setCreateTripData}) => {
    const [showModal, setShowModal] = useState(false);
    const [createTrip, setCreateTrip] = useState({
        name:'',
        origin:'',
        destination:'',
        arrival_dateTime:'',
        departure_dateTime:'',
        desc:''
    })
    const [desc, setDesc] = useState('');

    const setDescriptionValue = (value) => {
        setDesc(value);
    }
    const openModal = () => {
        setShowModal(true);
    }
    const closeModal = () => {
        setShowModal(false);
    }

    const handleInput = (event) => {
        const {name, value} = event.target;
        setCreateTrip({
            ...createTrip,
            [name]: value,
        })
        setCreateTripData({
            ...createTrip,
            [name]: value,
        })
    }


    return(
        <>
        
        <div className="mainFilterContainer">
            <p style={{color: 'white', fontSize:'1.7vw'}}>Create Your Own Trip</p>
            <div className="tripInputContainer">
                <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'row'}}>
                <input onChange={handleInput} name="name" className="tripInput leftTripInput" type="text" placeholder="Trip Name" required/>
                <input onChange={handleInput} name="origin" className="tripInput" type="text" placeholder="Origin" required/>
                <input onChange={handleInput} name="destination" className="tripInput" type="text" placeholder="Destination" required/>
                <input onChange={handleInput} name="arrival_dateTime" className="tripInput" type="datetime-local" placeholder="Start Date/Time" required/>
                <input onChange={handleInput} name="departure_dateTime" className="tripInput" type="datetime-local" placeholder="End Date/Time" required/>
                <input onChange={handleInput} name="desc" className="tripInput rightTripInputContainer" type="text" placeholder="Description" value={desc} onClick={openModal} required/>
                <button type="submit" className="createbutton"><p style={{fontSize:'1vw', fontFamily:'sans-serif', textAlign:'center', margin:'0', padding:'0'}}>Create</p></button>
                </form>
            </div>
         </div>
         {showModal && <ModalInputBox closeModal= {closeModal} setDescriptionValue = {setDescriptionValue}/>}
        </>
    )
}

export default CreateTripBar