import React, { useEffect, useState } from "react";
import styles from "./loader.module.css";
import Helmet from "react-helmet";

const listOfTitle = [
  "Environmental Planning",
  "Product Design",
  "Interiors",
  "Landscape",
  "Architecture",
];
export default function Loader() {
  const [animatedTitle, setAnimatedTitle] = useState(listOfTitle[0]);

  useEffect(() => {
    const tick = setInterval(
      () =>
        setAnimatedTitle(
          listOfTitle[Math.floor(Math.random() * listOfTitle.length)]
        ),
      600
    );

    return () => clearInterval(tick);
  });
  return (
    <div className={styles.mainLoad}>
      <Helmet>
        <title>Loading</title>
      </Helmet>
      <div className={styles.loader}>
        {/* <div className={styles.loadingText}>Loading:</div> */}
        <div className={styles.animatedTitle}>{animatedTitle}</div>
      </div>
    </div>
  );
}
