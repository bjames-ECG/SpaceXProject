import { useState, useEffect } from 'react';
import axios from '../node_modules/axios/index';



function RandomItem() {

    const [RandomItem, setRandomItem] = useState(null)

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    const getSingleRandomItem = () => {
        axios.get("https://api.spacexdata.com/v3/launches").then(
            (response) => {
                let randomIndex = getRandomInt(111)
                // console.log("Random Index Value: ", randomIndex)
            setRandomItem(response.data[randomIndex])
            // console.log("RandomItem Randomly fetched")
          }
        )
        // console.log("RandomItem CALL: ", RandomItem)
      }


//       useEffect(() => { 
//         getSingleRandomItem(); 
//   }, [])
  
    return (
      <>
        <div>
          Coming from the RandomItem Component.
          <button onClick={getSingleRandomItem}>Fetch data on a random launch</button>
        </div>
      </>
    )
  }
  
  export default RandomItem