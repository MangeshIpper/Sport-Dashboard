import "./topbar.css";
import img2 from "../../img/img2.jpg";

function Topbar() {
  return (
    <div className="topbarContainer">
      <div className="topbarCenter">
        <span className="logo">
          <a href="/">SportDashboard</a>
        </span>
      </div>
      <div className="topbarRight">
        <img src={img2} alt="" className="topbarImg" />
      </div>
    </div>
  );
}

export default Topbar;
