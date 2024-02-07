import { useState, useEffect } from 'react';
import "./SingleItem.css";
import { Data } from './App';

interface Props {
  proppedSingleLaunch: Data | null; // Change type to Data | null
  addFavorite: (missionName: string) => void;
  favorites: Data[];
}

function SingleItem({ proppedSingleLaunch, addFavorite, favorites }: Props) {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    launchData();
  }, []);

  const launchData = () => {
    try {
      setLoading(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  const dateConverter = (utcDate: string) => {
    return new Date(utcDate).toDateString();
  }

  if (loading) {
    return <>Loading. . .</>
  }

  if (!proppedSingleLaunch) { // Check if proppedSingleLaunch exists
    return <div id="outer-container">Select a launch</div>
  }

  return (
    <>
      <div id="outer-container">
        <div id='single-item-individual-launch' key={proppedSingleLaunch.mission_name}>
          {(!favorites.some(data => data.mission_name === proppedSingleLaunch.mission_name)) && <button onClick={() => addFavorite(proppedSingleLaunch.mission_name)}>Add Favorite</button>}
          <div><span id="label-text-font">Flight Number</span>: {proppedSingleLaunch.flight_number}</div>
          <div><span id="label-text-font">Mission Name</span>: {proppedSingleLaunch.mission_name}</div>
          <div><span id="label-text-font">Flight Details</span>: {proppedSingleLaunch.details}</div>
          <div><span id="label-text-font">Launch Date</span>: {dateConverter(proppedSingleLaunch.launch_date_local)}</div>
          {proppedSingleLaunch.launch_success === true && <div id="label-text-font">Launch was successful</div>}
          {proppedSingleLaunch.launch_success === false &&
            <div>
              <span id="label-text-font">Launch Failure Details</span>
              <div><span id="label-text-font">Reason</span>: {proppedSingleLaunch.launch_failure_details?.reason}</div>
              <div><span id="label-text-font">Altitude</span>: {proppedSingleLaunch.launch_failure_details?.altitude}</div>
              <div><span id="label-text-font">Time</span>: {proppedSingleLaunch.launch_failure_details?.time}</div>
            </div>}
        </div>
      </div>
    </>
  )
}

export default SingleItem;