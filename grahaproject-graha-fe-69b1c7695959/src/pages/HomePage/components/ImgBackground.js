import React, { useState, useEffect, useCallback } from "react";
import Carousel from "react-bootstrap/Carousel";
import styles from "../styles/homePage.module.css";
import "../styles/carouselStyle.css";
// import Loader from "../../../components/Loader/loader";
import HomeLoader from "./homeLoader/homeLoader";
import { BASE_URL,BASE_IMG_URL } from "../../../constants";

const ImgBackground = () => {
  const [bg, setBg] = useState([]);
  const [loading, setLoading] = useState(true);
  const mouseClickEvents = ['mousedown', 'click', 'mouseup'];

  function simulateMouseClick(element){
    mouseClickEvents.forEach(mouseEventType =>
      element.dispatchEvent(
        new MouseEvent(mouseEventType, {
            view: window,
            bubbles: true,
            cancelable: true,
            buttons: 1
        })
      )
    );
}

  const changeSlide = useCallback((event) => {
    // console.log(event.key);
    if(event.key === "ArrowLeft"){
      let element = document.querySelector('a[class="carousel-control-prev"]');
      simulateMouseClick(element);
    }
    if(event.key === "ArrowRight"){
      let element = document.querySelector('a[class="carousel-control-next"]');
      simulateMouseClick(element);
    }
  })

  useEffect(() => {
    document.addEventListener("keydown" , changeSlide , false)
  } )

  useEffect(() => {
    setLoading(true);
    fetch(BASE_URL + 'home-page?populate=*')
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Bad Response from Server");
        }
        return response.json();
      })

      .then((background) => {
        setBg(background.data.attributes.imgBackground.data);
      })
      
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // console.log(bg.imgBackground);

  if (loading) return <HomeLoader />;
  return (
    <div className={styles.full_screen_video_wrap}>
      <Carousel
        keyboard={true}
        controls={true}
        indicators={true}
      >
        {bg &&
          bg.map((img, idx) => (
            <Carousel.Item key={idx}>
              <div 
                className={styles.backgroundImage}
                style={{
                  backgroundImage: `url(${(BASE_IMG_URL +(img?.attributes.url))})`
                }}  
                >
              </div>
            </Carousel.Item>
          ))}
      </Carousel>
    </div>
  );
};

export default ImgBackground;
