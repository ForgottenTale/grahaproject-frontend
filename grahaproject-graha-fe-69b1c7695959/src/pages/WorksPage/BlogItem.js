import React, { useState } from "react";
import styles from "./styles/works.module.css";
// import img1 from './img1.jpg';
import { Link } from "react-router-dom";
import { motion, AnimatePresence  } from "framer-motion";
import imgNotFound from "../../assets/images/image-not-found.png";

const BlogItem = ({ blogs }) => {
  const [hover, setHover] = useState(false);

  return (
    <>
      {/* <h1 key={blog.id}>{blog.BlogTitle}</h1>
                        <img src={img1} alt = "i" /> */}
    <AnimatePresence> 
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className={styles.gridItem}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onTouchStart={() => {
          setHover(true);
          setTimeout(() => setHover(false), 3000);
        }}
      >
        <Link to={`/projects/${blogs.slug}`}>
          {/* <div className={hover ? styles.hover : styles.imageCover}>
            <h1>{blogs.BlogTitle}</h1>
            <div className={styles.caption}></div>
          </div>
          <img src={`${blogs.FeaturedMedia.url}`} alt="img 1" /> */}

          <div>
            <div className={hover ? styles.hover : styles.imageCover}>
              <h1>{blogs?.BlogTitle || "No Title"}</h1>
            </div>
            <embed
              alt=""
              src={(blogs?.FeaturedMedia?.data && `${blogs?.FeaturedMedia?.data?.attributes?.formats?.small?.url}`) || imgNotFound}
              className="img-fluid"
              autostart="1"
              controller="0"
              autoplay="1"
            />
          </div>
        </Link>
        {/* <p className={styles.mobileBlog}>{blogs.BlogTitle}</p> */}
      </motion.div>
    </AnimatePresence>
    </>
  );
};


export default React.memo(BlogItem);
