import { useState, useEffect } from 'react'
import './App.css'
import SingleItem from './SingleItem'
import FavoriteItems from './FavoritesList'
import ItemsList from './ItemsList'
import RandomItem from './RandomItem'

function App() {

  const [fetchedData, setFetchedData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [proppedSingleLaunch, setProppedSingleLaunch] = useState({});
  const [favorites, setFavorites] = useState([]);
  // const [flightId, setFlightId] = useState[''];

  useEffect(() => {
    fetchData();

  }, [])

  const findOneLaunch = (missionName) => {
    console.log(missionName);

    const index = fetchedData.findIndex(data => data.mission_name === missionName);

    console.log(index);

    setProppedSingleLaunch(fetchedData[index]);
  }

  const addFavorite = (missionName) => {
    const index = fetchedData.findIndex(data => data.mission_name === missionName);

    setFavorites([...favorites, fetchedData[index]]);

    addFavoriteNotification();
  }

  const addFavoriteNotification= () => {
    let snackbar = document.getElementById("added-to-favorite");

    // Add the "show" class to DIV
    snackbar.className = "show";
  
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 3000);
  }


  const removeFavoriteNotification= () => {
    let snackbar = document.getElementById("removed-from-favorite");

    // Add the "show" class to DIV
    snackbar.className = "show";
  
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 3000);
  }

  const removeFavorite = (missionName) => {
      let removedFavorite = favorites.filter(data => data.mission_name !== missionName);
      setFavorites(removedFavorite);
      localStorage.setItem("Favorites", JSON.stringify(removedFavorite));
      removeFavoriteNotification();
    }


  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://api.spacexdata.com/v3/launches');
      const result = await response.json();
      setFetchedData(result);

      let storage = JSON.parse(localStorage.getItem("Favorites"));
      if (storage !== null) setFavorites(storage);


      // console.log("FAVORITES ON INITIAL FETCH: ", favorites);
      setLoading(false);
      console.log("DATA SET: ", fetchedData)
    } catch (error) {
      setLoading(false);
      setError('Error fetching data');
    }
  };


  if (loading) {
    return <>Loading. . .</>
  }

  if (error) {
    return <>There was an error</>
  }

  return (
    <>
      <div className="page-container">
        <SingleItem className="single-item"
          proppedSingleLaunch={proppedSingleLaunch} 
          addFavorite={addFavorite}
          favorites={favorites}
        />
        <ItemsList className="items-list"
          fetchedData={fetchedData}
          findOneLaunch={findOneLaunch}
          proppedSingleLaunch={proppedSingleLaunch}
        />
        <FavoriteItems className="favorite-items"
          favorites={favorites}
          removeFavorite={removeFavorite}
          />
        {/* <RandomItem /> */}
      </div>
      <div id="added-to-favorite">Added to Favorites</div>
      <div id="removed-from-favorite">Removed from Favorites</div>
    </>
  )
}

export default App
