import "./home.css";
import { react, useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [data, setdata] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          "/edge/rest/events?offset=0&per-page=200&states=open%2Csuspended%2Cclosed%2Cgraded&tag-url-names=basketball%2Cnba&exchange-type=back-lay&odds-type=DECIMAL&include-prices=true&price-depth=1&price-mode=expanded&include-event-participants=true&exclude-mirrored-prices=false"
        );
        if (response) {
          setdata(response);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="home">
      <h1>Home Page</h1>
      <div className="homeWidgets">Welcome to home page</div>
    </div>
  );
}

export default Home;
