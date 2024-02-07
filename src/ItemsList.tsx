import "./ItemsList.css"

function ItemsList({ fetchedData, findOneLaunch }) {
  // console.log("data from ItemsList: ", fetchedData);



  if (Object.keys(fetchedData).length === 0) {
    return <div>loading</div>
  } 

  else
    return (
      <>
      {/* <SingleItem proppedData={proppedSingleLaunch}/> */}
        <div id="items-list-outer-container">
        <div>Choose a Mission Name</div>
        <div id="all-launches-box">
          <div id="launches-list">
          {fetchedData.map((data : {
            mission_name : string;
          }) => (
                <div id='individual-launch' key={data.mission_name} onClick={() => findOneLaunch(data.mission_name)}>
                    <div id="mission-name-text">{data.mission_name}</div>   
                </div>
            ))}
            </div>
        </div>
        </div>
      </>
    )
  }
  
  export default ItemsList