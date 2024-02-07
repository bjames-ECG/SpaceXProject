import { useEffect } from 'react';
import "./FavoritesList.css";
import { Data } from './App';

interface Props {
  favorites: Data[];
  removeFavorite: (missionName: string) => void;
}

function FavoritesList({ favorites, removeFavorite }: Props) {

  useEffect(() => {
    if (favorites.length > 0) localStorage.setItem("Favorites", JSON.stringify(favorites));

  }, [favorites]);

  //function used to convert the date format from the fetched utc version to a more readable format
  const dateConverter = (utcDate: string) => {
    // console.log(new Date(utcDate))
    return new Date(utcDate).toDateString()
  }

  return (
    <>
      <div id="outer-container">
        Saved Favorites
        <div id="all-launches-box">
          {favorites && favorites.map((data) => (
            <div id='favorites-individual-launch' key={data.mission_name}>
              <button onClick={() => removeFavorite(data.mission_name)}>Remove Favorite</button>
              <div><span id="label-text-font">Flight Number</span>: {data.flight_number}</div>
              <div><span id="label-text-font">Mission Name</span>: {data.mission_name}</div>
              <div><span id="label-text-font">Flight Details</span>: {data.details}</div>
              <div><span id="label-text-font">Launch Date</span>: {dateConverter(data.launch_date_local)}</div>
              <div><span id="label-text-font">Launch Site Name</span>: {data.launch_site.site_name}</div>
              {data.launch_success === true && <div id="label-text-font">Launch was successful</div>}
              {data.launch_success === false &&
                <div>
                  <span id="label-text-font">Launch Failure Details</span>
                  {data.launch_success === false && <div><span id="label-text-font">Reason</span>: {data.launch_failure_details?.reason}</div>}
                  {data.launch_success === false && <div><span id="label-text-font">Altitude</span>: {data.launch_failure_details?.altitude}</div>}
                  {data.launch_success === false && <div><span id="label-text-font">Time</span>: {data.launch_failure_details?.time}</div>}
                </div>}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default FavoritesList;