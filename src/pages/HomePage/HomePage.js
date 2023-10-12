import React from "react";
import HomeHeader from "./components/HomeHeader";
import VidBackground from "./components/VidBackground";
import styles from "./styles/homePage.module.css";
import useWindowSize from "../../utils/windowSize";
import ImgBackground from "./components/ImgBackground";
import Helmet from "react-helmet";


export default function HomePage() {
  const { width } = useWindowSize();
  // const [meta, setMeta] = useState(null);

  // useEffect(() => {
  //   fetch(BASE_URL + 'meta-data')
  //     .then((response) => {
  //       if (response.status >= 400) {
  //         throw new Error("Bad Response from Server");
  //       }
  //       return response.json();
  //     })

  //     .then((m) => {
  //       setMeta(m);
  //     });
  // }, []);

  return (
    <div className={styles.home_Page}>
      <Helmet>
        <title>Graha</title>
        {/* <meta content={meta?.text.slice(0,100)}></meta> */}
      </Helmet>
      <HomeHeader />
      {width > 768 ? <VidBackground /> : <ImgBackground />}
    </div>
  );
}
