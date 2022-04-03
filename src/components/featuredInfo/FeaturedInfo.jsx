import axios from "axios";
import { useState } from "react";
import { Button } from "react-bootstrap";
import "./featuredInfo.css";

function FeaturedInfo(props) {

  const [location, setLocation] = useState();

  const getLocation = async () =>{
    try{
      const response = await axios.get("/edge/rest/locale?ip=80.103.151.136");
      if(response){
        setLocation(response.data);
      }
    }catch(error){
      console.log(error);
    }
    
  }


  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Total</span>
        <div className="featuredContainer">
          <span className="featured">{props.total}</span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Per Page Data</span>
        <div className="featuredContainer">
          <span className="featured">{props.perPage}</span>
        </div>
      </div>
      <div className="featuredItem">
        <Button className="featuredTitle" onClick={getLocation}>Get Location</Button>
        <div className="featuredContainer">
          <span className="featured">{location ? location.country : ""}{" "}{location? location.currency :""}</span>
        </div>
      </div>
    </div>
  );
}

export default FeaturedInfo;
