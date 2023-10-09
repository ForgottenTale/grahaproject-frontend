import React, { useState, useEffect, useRef, useContext, Suspense } from "react";
import styles from "./styles/works.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BlogItem from "./BlogItem.js";
import Loader from "../../components/Loader/loader";
import CategoryLinks from "./CategoryLinks";
import { motion, AnimatePresence } from "framer-motion";
import Helmet from "react-helmet";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { BlogContext } from "../../contexts/blogContext";
import axios from 'axios';
import { BASE_URL } from "../../constants";


const WorksPage = () => {
  const [searchText, setSearchText] = useState("");
  const [active, setActive] = useState("all");
  const [loading, setLoading] = useState(true);
  const [cat, setCat] = useState([]);
  const [isRotate , setRotate] = useState(false);
  const [openMenu , setOpenMenu] = useState(false);
  const [hoverAll, setHoverAll] = useState(false);
  const inputFocus = useRef();

  const [blogs , [total , setTotal]] = useContext(BlogContext);

  const colors = {
    all: {
      color: "#9c9c9c",
    },
  };

  useEffect(() => {
    axios.get(BASE_URL + 'categories?populate=*')
      .then((c) => {
        setCat(c.data);
        setLoading(false);
      });
  }, []);

  const filterByCategories = (data, categoryName, searchText) => {
    let result =
      categoryName === "all"
        ? searchText === ""
          ? data.slice(0, total)
          : data
        : data.filter((item) => {
            return item?.attributes.Categories.data?.some(
              (category) => category?.attributes.CategoryName === categoryName
            );
          });
    if (searchText !== "" && total !== blogs.length) setTotal(blogs.length);
    return searchText === ""
      ? result
      : result.filter((item) => {
          return item?.attributes.BlogTitle.toLowerCase().includes(
            searchText.toLowerCase()
          );
        });
  };
  
  const onClickNavLinks = (e) => {
    let name = e.target.getAttribute("name");

    if (active === name) {
      setActive("all");
    } else {
      setActive(name);
    }
  };

  const handleColor = (name) => {
    let selectedCat = cat.data.find((x) => x.attributes.CategoryName === name) || colors[name];
    if (active === name) {
      return selectedCat.color;
    }
    return "#9c9c9c";
  };

  const handleFilterClick = () => {
    setRotate(!(isRotate));
    setOpenMenu(!(openMenu));
  }


  if (loading)
    return (
      <>
        <Loader />
      </>
    );

  return (
    <>
      <Header />

      <Helmet>
        <title>Graha | Works</title>
      </Helmet>

      <div className={styles.secondaryNav}> 

        <div className={styles.miniNav}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              onMouseEnter={() => {
                setHoverAll(true);
              }}
              onMouseLeave={() => {
                setHoverAll(false);
              }}
              style={
                hoverAll
                  ? { color: "red" }
                  : { color: "#9c9c9c" }
              }
              onClick={(e) => onClickNavLinks(e)}
              name="all"
              className={styles.navbarItem}
            >
              All
            </motion.div>
            {cat.data.map((c , idx) => (
              <>
                <CategoryLinks
                  key={idx}
                  category={c}
                  onClickNavLinks={onClickNavLinks}
                  handleColor={handleColor}
                />
              </>
            ))}
        </div>

        <div className={styles.searchBar}>
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            ref={inputFocus}
            className={styles.searchInput}
            type="text"
            placeholder="search"
        />
        </div>

        <div className={styles.mobileMiniNav} style={{display: "none"}}>
            <button
              onClick={() => handleFilterClick()} 
            >
              <FontAwesomeIcon 
                icon={faPlus}
                style={{
                  transition: "all .2s linear",
                  WebkitTransition: "all .2s linear",
                  msTransition: "all .2s linear",
                  marginLeft: "0.5em",
                  width: "0.9em"
                }}
                onClick={() => handleFilterClick()} 
                className={isRotate ? styles.rotate : ""}
                />
            </button>
        </div>
   
      </div>

      <motion.div
        transition={{ ease: "easeOut", duration: 2 }}
        className={openMenu ? styles.dropdown : styles.dropdown_hidden}
      >
        <div
          style={{ color: handleColor("all") }}
          onClick={(e) => onClickNavLinks(e)}
          name="all"
          className={styles.navbarItem}
        >
        All
        </div>
        {cat.data.map((c , idx) => (
          <>
            <CategoryLinks
              key={idx}
              category={c}
              onClickNavLinks={onClickNavLinks}
              handleColor={handleColor}
            />
          </>
        ))}
      </motion.div>
  
      <AnimatePresence>
        <motion.div transition={{ delay: 1 }} className={styles.gridContainer}>
          {filterByCategories(blogs, active, searchText).map((blog, idx) => (
            <Suspense fallback={<Loader />}>
              <BlogItem key={blog.id} blogs={blog.attributes} />
            </Suspense>
          ))}
        </motion.div>
      </AnimatePresence>
            
      <Footer />
    </>
  );
};

export default WorksPage;
