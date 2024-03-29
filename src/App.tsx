import { useState, useEffect } from 'react'
import './App.css'
import SingleItem from './SingleItem'
import FavoriteItems from './FavoritesList'
import ItemsList from './ItemsList'

export interface Data {
  mission_name: string;
  flight_number: number;
  details: string;
  launch_date_local: string;
  launch_site: {
    site_name: string;
  };
  launch_success: boolean;
  launch_failure_details?: {
    reason: string;
    altitude: number;
    time: number;
  };
}

function App() {


  const [fetchedData, setFetchedData] = useState<Data[]>([]);

  const [proppedSingleLaunch, setProppedSingleLaunch] = useState<Data | null>(null); // Initialize with null

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [favorites, setFavorites] = useState<Data[]>([]);

  useEffect(() => {
    fetchData();
  }, [])



  //find a launch based on a user selected missionName. Find the index where the missionName exists, update state using the item at the given index
  //sent as a prop to SingleItem
  const findOneLaunch = (missionName: string) => {
      const index = fetchedData.findIndex((data) => data.mission_name === missionName);
      setProppedSingleLaunch(fetchedData[index]);
  }


  const addFavorite = (missionName : string) => {
      const index = fetchedData.findIndex((data : any) => data.mission_name === missionName);
      setFavorites([...favorites, fetchedData[index]]);
    // addFavoriteNotification();
  }

  // const addFavoriteNotification= () => {
  //   let snackbar = document.getElementById("added-to-favorite");

  //   // Add the "show" class to DIV
  //   snackbar.className = "show";
  
  //   // After 3 seconds, remove the show class from DIV
  //   setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 3000);
  // }


  // const removeFavoriteNotification= () => {
  //   let snackbar = document.getElementById("removed-from-favorite");

  //   // Add the "show" class to DIV
  //   snackbar.className = "show";
  
  //   // After 3 seconds, remove the show class from DIV
  //   setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 3000);
  // }

  const removeFavorite = (missionName : any) => {
      let removedFavorite = favorites.filter((data) => data.mission_name !== missionName);
      setFavorites(removedFavorite);
      localStorage.setItem("Favorites", JSON.stringify(removedFavorite));
    }

  //fetch the initial data in a try catch block - set to allow for a loading sign to be used while data is being fetched, then rendered
  //check if anything is in localStorage, update favorites array based on whether an item exists or not
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://api.spacexdata.com/v3/launches');
      const result = await response.json();
      setFetchedData(result);

      const storage = JSON.parse(localStorage.getItem("Favorites") || '[]') as Data[];
      if (storage !== null) setFavorites(storage);

      setLoading(false);
      // console.log("DATA SET: ", fetchedData)
    } catch (error) {
      setLoading(false);
      setError('Error fetching data');
    }
  };


  if (loading) {
    return <>Loading. . .</>
  }

  if (error) {
    return <>There was an error. Try refreshing the page.</>
  }

  return (
    <div className="background">
      <div id="page-container">
        <div className='page-title'>
          <div>Space-X Launches</div>
        </div>
        <div className="bottom-information">
          <SingleItem
            proppedSingleLaunch={proppedSingleLaunch} 
            addFavorite={addFavorite}
            favorites={favorites}
          />
          <ItemsList
            fetchedData={fetchedData}
            findOneLaunch={findOneLaunch}
          />
          <FavoriteItems
            favorites={favorites}
            removeFavorite={removeFavorite}
            />
          {/* <RandomItem /> */}
        </div>
        <div id="added-to-favorite">Added to Favorites</div>
        <div id="removed-from-favorite">Removed from Favorites</div>
      </div>
    </div>
  )
}

export default App
