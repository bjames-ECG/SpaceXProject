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
        <div className="items-list-outer-container">
        <div>Choose a Mission Name</div>
        <div className="all-launches-box">
          <div className="launches-list">
          {fetchedData.map((data) => (
                <div className='individual-launch' key={data.mission_name} onClick={() => findOneLaunch(data.mission_name)}>
                    <div className="mission-name-text">{data.mission_name}</div>   
                </div>
            ))}
            </div>
        </div>
        </div>
      </>
    )
  }
  
  export default ItemsList