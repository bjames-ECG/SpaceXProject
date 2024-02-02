import { useState, useEffect } from 'react';
import "./SingleItem.css";



function SingleItem({ proppedSingleLaunch, addFavorite, favorites }) {

  const [loading, setLoading] = useState(false);

  // console.log("PROPPED: ", proppedSingleLaunch)

  useEffect(() => {
    launchData();
}, [])

const launchData = () => {
  try {
    setLoading(true);
    setLoading(false);
  } catch (error) {
    setLoading(false);
  }
}

const dateConverter = (utcDate) => {
  // console.log(new Date(utcDate))
  return new Date(utcDate).toDateString()
}



  if (loading) {
    return <>Loading. . .</>
  }


  if (!proppedSingleLaunch.mission_name) {
    return <div id="outer-container">Select a launch</div>
  }

    return (
      <>
        <div id="outer-container">
        <div id='single-item-individual-launch' key={proppedSingleLaunch.mission_name}>
        {(!favorites.filter(data => data.mission_name === proppedSingleLaunch.mission_name).length) && <button onClick={() => addFavorite(proppedSingleLaunch.mission_name)}>Add Favorite</button>}
            <div><span id="label-text-font">Flight Number</span>: {proppedSingleLaunch.flight_number}</div>
            <div><span id="label-text-font">Mission Name</span>: {proppedSingleLaunch.mission_name}</div>
            <div><span id="label-text-font">Flight Details</span>: {proppedSingleLaunch.details}</div>
            <div><span id="label-text-font">Launch Date</span>: {dateConverter(proppedSingleLaunch.launch_date_local)}</div>
            {/* <div><span id="label-text-font">Launch Date</span>: {proppedSingleLaunch.launch_date_local}</div> */}
            {proppedSingleLaunch.launch_success === true && <div id="label-text-font">Launch was successful</div>}
            {proppedSingleLaunch.launch_success === false && 
            <div>
              <span id="label-text-font">Launch Failure Details</span>
            {proppedSingleLaunch.launch_success === false && <div><span id="label-text-font">Reason</span>: {proppedSingleLaunch.launch_failure_details.reason}</div>}
            {proppedSingleLaunch.launch_success === false && <div><span id="label-text-font">Altitude</span>: {proppedSingleLaunch.launch_failure_details.altitude}</div>}
            {proppedSingleLaunch.launch_success === false && <div><span id="label-text-font">Time</span>: {proppedSingleLaunch.launch_failure_details.time}</div>}
              </div>}
        </div>
        </div>
      </>
    )
  }

  export default SingleItem