import { useState, useEffect } from 'react'
import './App.css'
import SingleItem from './SingleItem'
import FavoriteItems from './FavoritesList'
import ItemsList from './ItemsList'

interface Data {
  mission_name: string;
  mission_id: number;
  launch_date_local: string;
  launch_success: boolean;
  details: string;
  launch_site: {
    site_name: string
  }
}

function App() {

  const [fetchedData, setFetchedData] = useState<Data | {}>({})

  const [proppedSingleLaunch, setProppedSingleLaunch] = useState<Data | {}>({});

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [favorites, setFavorites] = useState<any>([]);

  useEffect(() => {
    fetchData();
  }, [])



  //find a launch based on a user selected missionName. Find the index where the missionName exists, update state using the item at the given index
  //sent as a prop to SingleItem
  const findOneLaunch = (missionName) => {
    if (missionName) {
      const index = fetchedData.findIndex((data) => data.mission_name === missionName);
      setProppedSingleLaunch(fetchedData[index]);
    }
  }


  //add a launch to the favorites array for use in local storage
  //sent as a prop to SingleItem, so that the favorite button can be added to every item.
  const addFavorite = (missionName) => {
    //declare the index based on the missionName, which is based on the user's click
    if (missionName) {

    const index = fetchedData.findIndex((data) => data.mission_name === missionName);

    //add the new favorite launch to the exisiting array of favorites
    setFavorites([...favorites, fetchedData[index]]);

    //Part of adding a toast notification
    // addFavoriteNotification();
    }
  }

  //The following addFavoriteNotification and removeFavoriteNotification are part of implementing a toast when favorites are added and removed.
  //Still working on implementing via Typescript

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

  //function for removing favorite from localstorage
  //sent as a prop to FavoriteItems, to add remove button on all items on Favorites array when rendered.
  const removeFavorite = (missionName) => {
      //declare a variable that will be a filtered version of the favorites array. missionName variable is based on user clicking to remove favorite.
      let removedFavorite = favorites.filter((data) => data.mission_name !== missionName);

      //update favorites state, save to local storage
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

      let storage = JSON.parse(localStorage.getItem("Favorites"));
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
