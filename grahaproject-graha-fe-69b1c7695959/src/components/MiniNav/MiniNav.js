import React from "react";
import styles from "./miniNav.module.css";
import { NavLink } from "react-router-dom";

function MiniNav() {
  return (
    <div className={styles.miniNav}>
      <ul>
        {/* <li><NavLink className={styles.navlink} to="/people">people</NavLink></li> */}
        <li>
          <a className={styles.navlink} href="/studio/#people-section">
            people
          </a>
        </li>
        <li>
          <NavLink className={styles.navlink} to="/contact">
            contact
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default MiniNav;
