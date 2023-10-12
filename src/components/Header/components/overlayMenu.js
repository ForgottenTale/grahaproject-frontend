import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from "./overlayMenu.module.css";
import { motion } from 'framer-motion';

const Overlay = ({open , setOpen}) => {
  return (
    <>
        { open ?
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ 
                opacity: 1,
                transition : {
                    duration: 0.5
                },
                }}
                exit={{opacity : 0}}
                className={styles.overlayMenu}
                onClick={() => setOpen(false)} 
                id="overlay"    
            >
                <nav>
                    <NavLink className={styles.navlink} to="/works">
                        works
                    </NavLink>
                    <NavLink className={styles.navlink} to="/studio">
                        studio
                    </NavLink>
                    <NavLink className={styles.navlink} to="/contact">
                        contact
                    </NavLink>
                </nav>
            </motion.div>
        : null
        }
    </>
  )
}
export default Overlay;