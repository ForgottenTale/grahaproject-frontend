import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./thumbGallery.css"
import { motion } from "framer-motion";
import imageNotFound from "../../../assets/images/image-not-found.png"

const ThumbGallery = (props) => {

  const handleKeyPress = target => {
    if(target.charCode === "escape"){
      props.setOverlay(false);
    }
  }

  const handleThumbClick = (url) => {
    let pos = props.images.findIndex(function(item , idx){
      if (item?.attributes?.url === url){
        return idx + 1
      }
    });
    props.idxChange(pos)
    console.log("Thumb Index: ", pos);
  }

  return (
    <>
      {
        props.showOver ?

        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition : {
                duration: 0.5
              },
            }}
            exit={{opacity : 0}}
            className="gallery"
            onKeyPress={handleKeyPress}
            onClick={() => props?.setOverlay(false)}
          >

            <motion.div
              animate={{
                transition: {
                  when: "beforeChildren",
                  staggerChildren: 0.3,
                },
              }}
              className="gallery_container"

            >
            {
                props.images && props?.images.map((image , idx) => {
                  return (
                    <>
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      // onClick={handleThumbClick(idx)}
                    >
                        <img
                          src={image?.attributes?.formats?.small?.url || imageNotFound}                      
                          onClick={() => handleThumbClick(image?.attributes?.url || "")}
                          className="thumb_image"
                          alt="img"
                      />
                    </motion.div>

                    </>
                  )
                })
              }
            </motion.div>

          </motion.div>

        </>

        : null
      }
    </>
  );
};

export default ThumbGallery;