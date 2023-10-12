import { React, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import styles from "./homeLoader.module.css";
import { BASE_URL, BASE_IMG_URL } from "../../../../constants";

export default function HomeLoader() {

  const [loader, setLoader] = useState("");

  useEffect(() => {
    fetch(BASE_URL + 'loader-background?populate=*')
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Bad Response from Server");
        }
        return response.json();
      })

      .then((load) => {
        console.log(load)
        setLoader(load.data.attributes.media.data[0].attributes.url);
      });

  }, []);

  return (
    <div
      className={styles.mainLoad}
    >
      <Helmet>
        <title>Loading</title>
      </Helmet>
      <div
        className={styles.homeLoader}
        style={{
          backgroundImage: `url(${BASE_IMG_URL + loader})`,
          color: "none"
        }}
        aria-label="loading_page"
        title=""
        aria-readonly="loading_page"
        readonly
      >
      </div>
    </div>
  )
}

