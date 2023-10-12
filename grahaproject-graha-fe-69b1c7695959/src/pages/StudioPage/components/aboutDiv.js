import React, { useContext } from "react";
import styles from "./styles/aboutDiv.module.css"
import { AboutContext } from "../../../contexts/contexts";
import { BASE_IMG_URL } from "../../../constants"

const AboutDiv = (props) => {

    const about = useContext(AboutContext);

    return (
        <div className={styles.about_container}>
            <div className={styles.mediaBox} id="about" style={{ backgroundImage: `url(${BASE_IMG_URL + props?.imagePath?.data.attributes.url})` }}></div>

            <div className={styles.left}>
                {about && about.aboutPara1}
            </div>
            <div className={styles.right}>
                {about && about.aboutPara2}
            </div>
            <div className={styles.left}>
                {about && about.aboutPara3}
            </div>
            <div className={styles.right}>
                {about && about.aboutPara4}
            </div>
        </div>
    )

}

export default AboutDiv;