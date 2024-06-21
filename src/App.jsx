import React, { useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import Auth1 from './pages/Auth'
import {BrowserRouter as Router,
        Route,
        Routes
    } from 'react-router-dom'

import 'stream-chat-react/dist/css/index.css';
import Bio from './pages/Bio';
import AllTrips from './pages/Alltrips';
import MyTrip from './pages/MyTips';
import CommunityTrips from './pages/CommunityTrips';
import TripPage from './pages/tripPage';
import ProfilePage from './pages/ProfilePage';
import Notifications from './pages/Notifications';
import { getCookieValue } from './components/cookieFunc';
import ChatApp from './pages/ChatApp';

const cookies = new Cookies();

const apiKey = 'pqbq6waxtf2e';

const authToken = cookies.get("token");

const client = StreamChat.getInstance(apiKey);

if(authToken) {
    client.connectUser({
        id: cookies.get('userId'),
        name: cookies.get('username'),
        fullName: cookies.get('fullName'),
        image: cookies.get('avatarURL'),
        hashedPassword: cookies.get('hashedPassword'),
        phoneNumber: cookies.get('phoneNumber'),
    }, authToken)
}


const App = () => {

    
    const [createType, setCreateType] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    return (
        
        <>
            {/* <div className="app__wrapper">
            <Chat client={client} theme="team light">
                <ChannelListContainer
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                />
                <ChannelContainer
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    createType={createType}
                />
            </Chat>
        </div> */}
        <Router>
            <Routes>
                <Route path='/' element = {<Auth1/>}/>
                <Route path='/Bio' element = {<Bio/>}/>
                <Route path='/AllTrips' element={<AllTrips groupName = {"Trips of friend and Community"}/>}/>
                <Route path='/Notification' element={<Notifications/>}/>
                <Route path='/MyTrip' element={<MyTrip/>}/>
                <Route path='/Community/CommunityTrips' element={<CommunityTrips/>}/>
                <Route path='/trips/:trip_id' element={<TripPage/>}/>
                <Route path='/myProfile' element={<ProfilePage/>}/>
                <Route path='/users/:user_id' element={<ProfilePage/>}/>
                <Route path='/chatapp' element={<ChatApp/>} />
            </Routes>
        </Router>
        </>
    );
}

export default App;
