import "./featuredInfo.css";

function FeaturedInfo(props) {
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
        <span className="featuredTitle">Cost</span>
        <div className="featuredContainer">
          <span className="featured">$2,225</span>
        </div>
      </div>
    </div>
  );
}

export default FeaturedInfo;
