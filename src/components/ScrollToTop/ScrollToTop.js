import React, { useEffect, useState } from "react";
import styles from "./scrolltotop.module.css";
import chevUp from "../../assets/images/circle-chevron-up-solid_icon.png"

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scorlled upto given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top cordinate to 0
  // make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    // document.location.hash = "";
    window.history.replaceState('', document.title, window.location.origin + window.location.pathname + window.location.search);
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className={styles.button}>
      {isVisible && (
        <div onClick={scrollToTop} className={styles.scroll_icon}>
          {/* <FontAwesomeIcon size="lg" icon={faChevronCircleUp} /> */}
          {/* <svg className={styles.chev_icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M416 352c-8.188 0-16.38-3.125-22.62-9.375L224 173.3l-169.4 169.4c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25C432.4 348.9 424.2 352 416 352z"/></svg> */}
          <img className={styles.chev_icon} src={chevUp} alt="img" />
        </div>
      )}
    </div>
  );
}
