import React, {useState} from "react";
import styles from "./header.module.css";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logos/graha-black.png";
import Overlay from "./components/overlayMenu";


export default function HomePageContents({ pageLogo = logo , color = "black"}) {
  const [open , setOpen] = useState(false)

  return (
    <>

      <Overlay open={open} setOpen={setOpen}></Overlay>

      <nav className={styles.header}>
      <NavLink to="/home">
        <img alt="Graha" className={styles.logo} src={pageLogo}></img>
      </NavLink>

        <div className={styles.navMenu}>

          <div className={styles.navList}>
            <NavLink className={styles.navlink} to="/works">
              works
            </NavLink>
            <NavLink className={styles.navlink} to="/studio">
              studio
            </NavLink>
            <NavLink className={styles.navlink} to="/contact">
              contact
            </NavLink>
          </div>

          <input 
            type="checkbox" 
            id="toggler" 
            checked={open}
            className={styles.toggler} 
            onClick={() => setOpen(!(open))}
          />
          <div className={styles.hamburger}>
            <div style={{background: color}}></div>
            <div style={{background: color}}></div>
            <div style={{background: color}}></div>
          </div>
        </div>

      </nav>

      
    </>
  );
}
