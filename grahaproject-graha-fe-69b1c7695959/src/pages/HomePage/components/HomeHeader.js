import React, { useState } from "react";
import styles from "../styles/homeHeader.module.css";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/images/logos/graha-logo-white.png";
import HomeDropdown from "./HomeDropdown";




export default function HomeHeader() {
  const [open , setOpen] = useState(false)


  return (
    <>
      <HomeDropdown open={open} setOpen={setOpen} />

      <nav className={styles.header}>
      <NavLink to="/home">
        <img alt="Graha" className={styles.logo} src={logo}></img>
      </NavLink>

        <div className={styles.navMenu}>
          <input 
            type="checkbox" 
            id="toggler" 
            className={styles.toggler} 
            onClick={() => setOpen(!(open))}
          />
          <div className={styles.hamburger}>
            <div style={{background: "white"}}></div>
            <div style={{background: "white"}}></div>
            <div style={{background: "white"}}></div>
          </div>
        </div>

      </nav>
    </>
  );
}
