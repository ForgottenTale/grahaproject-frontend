import React, { useState, useEffect, useRef, useCallback, useContext } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./styles/ProjectPage.css";
import { useParams } from "react-router-dom";
import Helmet from "react-helmet";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand } from "@fortawesome/free-solid-svg-icons";
import thumb from "../../assets/images/thumbnails.svg"
import ThumbGallery from "./components/thumbnailOverlay";
import Slider from "react-slick";
import imageNotFound from "../../assets/images/image-not-found.png"
import { ProjectContext } from "../../contexts/projectContext";
import { Remarkable } from "remarkable";

// if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
//   console.log("Mobile");
//  } else {
//    console.log("Desktop")
//  }

const md = new Remarkable();

function renderMarkdownToHTML(markdown) {
  // This is ONLY safe because the output HTML
  // is shown to the same user, and because you
  // trust this Markdown parser to not have bugs.
  const renderedHTML = md.render(markdown);
  return {__html: renderedHTML};
}


export default function ProjectPage() {
  const { slug } = useParams();
  
  const handle = useFullScreenHandle();
  const [showOverlay , setShowOverlay] = useState(false)
  const [_ , setIndex] = useState(0)
  const mouseClickEvents = ['mousedown', 'click', 'mouseup'];

  const blog = useContext(ProjectContext);

  const [selectedImg, setSelectedImg] = useState(blog?.FeaturedMedia?.url);

  const markup = renderMarkdownToHTML(blog?.BlogContent);

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
      let element = document.querySelector('button[class="slick-arrow slick-prev"]');
      simulateMouseClick(element);
    }
    if(event.key === "ArrowRight"){
      let element = document.querySelector('button[class="slick-arrow slick-next"]');
      simulateMouseClick(element);
    }
  })

  useEffect(() => {
    document.addEventListener("keydown" , changeSlide , false)
  } )

  const sliderRef = useRef();

  useEffect(() => {
    window.addEventListener('orientationchange' , () => {
      if (window.screen.orientation.angle === 0 && handle.active){
        handle.exit()
      }
    })
  })

  const handleIndex = (i) =>{
    console.log("Thumb index from prop: ", i)
    setIndex(i)
    sliderRef.current.slickGoTo(i);
  }

  const settings = {

    beforeChange: function(index){
      
    },

    afterChange: function(index) {
      console.log(
        `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
      );
    }
  }

  return (
    <>
      <Header />
      
      <Helmet>
        <title>Graha | {blog?.BlogTitle || slug || "No Title Provided"}</title>
      </Helmet>

      <div className="project_container">
        <div className="top_section">
        <FullScreen 
          handle={handle}
        >
          <div
            className={handle.active ? "fullscreen_view" : "selected"}
          >
            <Slider
              {...settings}
              ref={sliderRef}
              dots={false}
              infinite={true}
              slidesToScroll={1}
              slidesToShow={1}
              fade={true}
              className={handle.active ? "fullscreen_view" : "selected"}
              slide="img"
              
            >
              {blog?.otherImages?.data?.map((img , idx) => (
                <img
                  src={img?.attributes?.url || imageNotFound}
                  onClick={() => setSelectedImg(img?.attributes?.url || "")}
                  style={{verticalAlign:"baseline"}}
                  alt="img"
                />
              ))}
            </Slider>
          </div>
        </FullScreen>


        <div className="toolbar">
          <div>
            <FontAwesomeIcon 
              onClick={handle.enter}
              className="fullscreen_button"
              icon={faExpand} 
            />
          </div>

          <div>
            <img 
              src={thumb}
              className="thumbnail"
              onClick={() => setShowOverlay(true)}
              alt="img"
            />            
          </div>
        </div>

        <div className="blogMain">
          <div className="blog_heading">
            <h1>{blog?.BlogTitle}</h1>
            <h5>Client : {blog?.Client}</h5>
            <h5>Location : {blog?.Location}</h5>
          </div>
          <div className="blog_content">
            <p dangerouslySetInnerHTML={markup}></p>
            {/* <p>{blog?.BlogContent || ""}</p> */}
          </div>
        </div>
        
        </div>

      </div>

      <ThumbGallery 
        images={blog?.otherImages?.data} 
        showOver={showOverlay} 
        setOverlay={setShowOverlay}
        setImg={setSelectedImg} 
        selectImg={selectedImg}
        idxChange={handleIndex}
      />

      <Footer />
    </>
  );
}
