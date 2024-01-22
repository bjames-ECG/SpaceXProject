import { useState, useEffect } from 'react';
import "./SingleItem.css";



function SingleItem({ proppedSingleLaunch, addFavorite, favorites }) {

  // const [singleItem, setSingleItem] = useState(null);
  const [loading, setLoading] = useState(false);

  // console.log("********", proppedSingleLaunch)

  useEffect(() => {
    // setSingleItem();
    launchData();
    // addFavorite();
}, [])

const launchData = () => {
  try {
    setLoading(true);
    // setSingleItem(proppedSingleLaunch);
    setLoading(false);
    // console.log("SINGLE ITEM SET IN SINGLE ITEM COMPOENENT: ", singleItem)
  } catch (error) {
    setLoading(false);
    setError('Error fetching data');
  }
}

  if (loading) {
    return <>Loading. . .</>
  }


  if (!proppedSingleLaunch.mission_name) {
    return <div className="outer-container">Select a launch</div>
  }

    return (
      <>
        <div className="outer-container">
        <div className='single-item-individual-launch' key={proppedSingleLaunch.mission_name}>
        {(!favorites.filter(data => data.mission_name === proppedSingleLaunch.mission_name).length > 0) && <button onClick={() => addFavorite(proppedSingleLaunch.mission_name)}>Favorite</button>}
            <div><span className="label-text-font">Flight Number</span>: {proppedSingleLaunch.flight_number}</div>
            <div><span className="label-text-font">Mission Name</span>: {proppedSingleLaunch.mission_name}</div>
            <div><span className="label-text-font">Flight Details</span>: {proppedSingleLaunch.details}</div>
            <div><span className="label-text-font">Launch Date</span>: {proppedSingleLaunch.launch_date_local}</div>
            {/* <div><span className="label-text-font">Launch Site Name</span>: {proppedSingleLaunch.launch_site.site_name}</div> */}
            {proppedSingleLaunch.launch_success === true && <div className="label-text-font">Launch was successful</div>}
            {proppedSingleLaunch.launch_success === false && 
            <div>
              <span className="label-text-font">Launch Failure Details</span>
            {proppedSingleLaunch.launch_success === false && <div><span className="label-text-font">Reason</span>: {proppedSingleLaunch.launch_failure_details.reason}</div>}
            {proppedSingleLaunch.launch_success === false && <div><span className="label-text-font">Altitude</span>: {proppedSingleLaunch.launch_failure_details.altitude}</div>}
            {proppedSingleLaunch.launch_success === false && <div><span className="label-text-font">Time</span>: {proppedSingleLaunch.launch_failure_details.time}</div>}
              </div>}
        </div>
        </div>
      </>
    )
  }

  export default SingleItem