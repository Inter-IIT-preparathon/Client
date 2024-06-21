import Carousel from "react-elastic-carousel"
import React, {useState} from "react"
import profilePhoto from '../assets/Profile.jpeg'

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];

const Slider = ({groups, tripInvites, userData, userBio}) => {
    console.log("tripInvites are:",tripInvites);
    const [visible, setVisible] = useState(true);
    const updateVisible = () => {
      setVisible(false);
    }
    return (
    <>
      <div className="App">
        <Carousel breakPoints={breakPoints}>
          {groups && groups.map((ele) => {
            return  <div className="Item">
            <p style={{fontSize:'1vw', fontFamily:'cursive', margin:'0', padding:'0', paddingBottom:'0.8vw'}}>{ele.trip_name}</p>
            <div style={{display:'flex', flexDirection:'row', alignItems:'center',justifyContent:'space-around', width:'100%', marginBottom:'1.5vw'}}>
              <div>
                <img style={{borderRadius:'50%', width:'3vw'}} src={ele.user_profile_photo ? ele.user_profile_photo : profilePhoto} alt="" />
              </div>
              <div>
                <p style={{fontSize:'0.8vw', fontFamily:'cursive', margin:'0', padding:'0', paddingBottom:'0.5vw'}}>Created By</p>
                <p style={{fontSize:'0.8vw', fontFamily:'cursive', margin:'0', padding:'0'}}>{ele.user_name}</p>
              </div>
            </div>
            <div style={{display:"flex", flexDirection:'row', alignItems:'center', justifyContent:'space-around', width:'100%'}}>
              <div>
                <p style={{fontSize:'0.8vw', fontFamily:'cursive', margin:'0', padding:'0', paddingBottom:'0.5vw'}}>From</p>
                <p style={{fontSize:'0.8vw', fontFamily:'cursive', margin:'0', padding:'0'}}>{ele.trip_origin}</p>
              </div>
              <button style={{padding:'0.3vw', borderRadius:'0.3vw', border:'none', backgroundColor:'#93c7fd'}}><p style={{fontSize:'0.8vw', fontFamily:'cursive', margin:'0', padding:'0', cursor:'pointer'}}>More Info</p></button>
              <div>
                <p style={{fontSize:'0.8vw', fontFamily:'cursive', margin:'0', padding:'0', paddingBottom:'0.5vw'}}>To</p>
                <p style={{fontSize:'0.8vw', fontFamily:'cursive', margin:'0', padding:'0'}}>{ele.trip_destination}</p>
              </div>
            </div>
          </div>
          })}
          {tripInvites
           && tripInvites.map((ele) => {
            return <div>
              {visible && <div className="Item">
            <p style={{fontSize:'1vw', fontFamily:'cursive', margin:'0', padding:'0', paddingBottom:'0.8vw'}}>{ele.trip_name}</p>
            <div style={{display:'flex', flexDirection:'row', alignItems:'center',justifyContent:'space-around', width:'100%', marginBottom:'1.5vw'}}>
              {userBio && userBio.map((ele) => {
                return <div>
                <img style={{borderRadius:'50%', width:'3vw'}} src={ele.user_profile_photo} alt="" />
              </div>
              })}
              <div>
                <p style={{fontSize:'0.8vw', fontFamily:'cursive', margin:'0', padding:'0', paddingBottom:'0.5vw'}}>Created By</p>
                {userData && userData.map((ele) => {
                  return <p style={{fontSize:'0.8vw', fontFamily:'cursive', margin:'0', padding:'0'}}>{ele.user_name}</p>
                })}
              </div>
            </div>
            <div style={{display:"flex", flexDirection:'row', alignItems:'center', justifyContent:'space-around', width:'100%'}}>
              <div>
                <p style={{fontSize:'0.8vw', fontFamily:'cursive', margin:'0', padding:'0', paddingBottom:'0.5vw'}}>From</p>
                <p style={{fontSize:'0.8vw', fontFamily:'cursive', margin:'0', padding:'0'}}>{ele.trip_origin}</p>
              </div>
              <div style={{display:'flex', flexDirection:'column'}}>
                <button style={{padding:'0.3vw', borderRadius:'0.3vw', border:'none', backgroundColor:'#93c7fd'}} onClick={updateVisible}><p style={{fontSize:'0.8vw', fontFamily:'cursive', margin:'0', padding:'0', cursor:'pointer'}}>Accept</p></button>
                <button style={{padding:'0.3vw', borderRadius:'0.3vw', border:'none', backgroundColor:'#93c7fd', marginTop:'0.3vw'}} onClick={updateVisible}><p style={{fontSize:'0.8vw', fontFamily:'cursive', margin:'0', padding:'0', cursor:'pointer'}}>Reject</p></button>
              </div>
              <div>
                
                <p style={{fontSize:'0.8vw', fontFamily:'cursive', margin:'0', padding:'0', paddingBottom:'0.5vw'}}>To</p>
                <p style={{fontSize:'0.8vw', fontFamily:'cursive', margin:'0', padding:'0'}}>{ele.trip_destination}</p>
              </div>
            </div>
          </div>}
            </div>
          })}
          {/* <div className="Item">Two</div> */}
        </Carousel>
      </div>
    </>
    )
}

export default Slider
