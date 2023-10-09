import { motion } from "framer-motion";
import { useState } from "react";
import styles from "./styles/works.module.css";

const CategoryLinks = ({ category, onClickNavLinks, handleColor }) => {
  const [hover, setHover] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      // style={{color: (hover ? c.color : "#9c9c9c")}}
      style={
        hover
          ? { color: category.attributes.color }
          : { color: handleColor(category.attributes.CategoryName) }
      }
      onClick={(e) => onClickNavLinks(e)}
      name={category.attributes.CategoryName}
      className={styles.navbarItem}
    >
      {category.attributes.CategoryName === 'all' ? 'All' : category.attributes.CategoryName}
    </motion.div>
  );
};

export default CategoryLinks;
