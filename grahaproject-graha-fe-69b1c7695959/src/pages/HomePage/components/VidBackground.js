import React, { useState, useEffect, useCallback } from "react";
import Carousel from "react-bootstrap/Carousel";
import styles from "../styles/homePage.module.css";
import "../styles/carouselStyle.css";
import HomeLoader from "./homeLoader/homeLoader";
import { BASE_URL } from "../../../constants";

export default function VidBackground() {
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
        console.log(background);
        setBg(background.data.attributes.background.data);
      })

      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return (
      
    <HomeLoader /> 
      
  );

  return (
    <div className={styles.full_screen_video_wrap}>
      <Carousel fade
        keyboard={true}
        controls={true}
        indicators={true}
      >
        {bg &&
          bg.map((video, idx) => (
            <Carousel.Item key={idx}>
              <div 
                className={styles.mediaBox}
                style={{
                  backgroundImage: `url(${video?.attributes.url})`
                }}
                aria-label="home"
                title=""
                >
              </div>
            </Carousel.Item>
          ))}
      </Carousel>
    </div>
  );
}
