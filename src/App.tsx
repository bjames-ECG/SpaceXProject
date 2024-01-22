import { useState, useEffect } from 'react'
import './App.css'
import SingleItem from './SingleItem'
import FavoriteItems from './FavoritesList'
import ItemsList from './ItemsList'

function App() {

  const [fetchedData, setFetchedData] = useState<any>({});
  const [loading, setLoading] = useState<any>(false);
  const [error, setError] = useState<any>("");
  const [proppedSingleLaunch, setProppedSingleLaunch] = useState<any>({});
  const [favorites, setFavorites] = useState<any>([]);
  // const [flightId, setFlightId] = useState[''];

  useEffect(() => {
    fetchData();

  }, [])

  const findOneLaunch = (missionName) => {
    // console.log(missionName);

    const index = fetchedData.findIndex((data:any) => data.mission_name === missionName);

    setProppedSingleLaunch(fetchedData[index]);
  }

  const addFavorite = (missionName) => {
    const index = fetchedData.findIndex((data:any) => data.mission_name === missionName);

    setFavorites([...favorites, fetchedData[index]]);

    addFavoriteNotification();
  }

  const addFavoriteNotification= () => {
    let snackbar = document.getElementById!("added-to-favorite");

    // Add the "show" class to DIV
    snackbar.className = "show";
  
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 3000);
  }


  const removeFavoriteNotification= () => {
    let snackbar = document.getElementById!("removed-from-favorite");

    // Add the "show" class to DIV
    snackbar.className = "show";
  
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 3000);
  }

  const removeFavorite = (missionName) => {
      let removedFavorite = favorites.filter((data:any) => data.mission_name !== missionName);
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
