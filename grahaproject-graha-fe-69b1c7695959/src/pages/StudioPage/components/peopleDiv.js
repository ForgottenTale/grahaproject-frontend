import React, { useContext } from "react";
import { AboutContext, PeopleProvider } from "../../../contexts/contexts";
import TeamList from "../TeamList";
import styles from "./styles/peopleDiv.module.css"

const PeopleDiv = (props) => {

    const team = useContext(AboutContext);

    return(
        <PeopleProvider>
            <div
                className={styles.peopleContainer}
            >
                <div className={styles.mediaBox} id="people" style={{backgroundImage: `url(${props?.imagePath?.data.attributes.url})`}}><h1>People</h1></div>
                <TeamList />

                <div className={styles.miniContent}>
                    <div className={styles.mini_head}>Team Since 2018</div>
                    <div className={styles.miniInfo}>{team?.teamList}</div>
                </div>

                <div className={styles.miniContent}>
                    <div className={styles.mini_head}>Associates</div>
                    <div className={styles.miniInfo}>{team?.associates}</div>
                </div>
            
            </div>
            
        </PeopleProvider>
    )

}

export default PeopleDiv;