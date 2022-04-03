import "./sidebar.css";
import { LineStyle, TrendingUp } from "@mui/icons-material";
import Timeline from "@mui/icons-material/Timeline";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Sales
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
