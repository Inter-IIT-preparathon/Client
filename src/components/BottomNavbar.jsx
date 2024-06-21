import React from "react";
import TripIcon from '../assets/airplane.png';
import HomeIcon from '../assets/home.png';
import CommunityIcon from '../assets/group.png'
import NotificationIcon from '../assets/bell.png';
import { Link } from "react-router-dom";
import messageIcon from '../assets/message.png';
import ProfileIcon from '../assets/user.png'

const BottomNavbar = () => {
    return(
        <>
            <nav className="Navbar">
                <div className="ItemContainer">
                    <Link to='/AllTrips'>
                    <img className="ItemContainer" src={TripIcon} alt="Trip" />
                    </Link>
                </div>
                <div className="ItemContainer">
                    <img className="ItemContainer" src={HomeIcon} alt="Home" />
                </div>
                <div className="ItemContainer">
                    <img className="ItemContainer" src={CommunityIcon} alt="Community" />
                </div>
                <div className="ItemContainer">
                    <Link to='/Notification'>
                    <img className="ItemContainer" src={NotificationIcon} alt="Nptification" />
                    </Link>
                </div>
                <div className="ItemContainer">
                    <img className="ItemContainer" src={messageIcon} alt="chat" />
                </div>
                <div className="ItemContainer">
                    <Link to='/myProfile'>
                    <img className="ItemContainer" src={ProfileIcon} alt="chat" />
                    </Link>
                </div>
            </nav>
        </>
    )
}

export default BottomNavbar