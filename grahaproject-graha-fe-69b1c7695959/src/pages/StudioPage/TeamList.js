import React, { useContext } from "react";
import styles from "./components/styles/peopleDiv.module.css";
import { Link } from "react-router-dom";
import { PeopleContext } from "../../contexts/contexts";
import {BASE_IMG_URL} from "../../constants"

function TeamList() {

  const teams = useContext(PeopleContext);
  console.log(teams)
  return (
    <>
      <div className={styles.teamGrid}>
        {teams.map((person, idx) => (
          <>
            <Link to={{
              pathname: `/team/${person?.attributes.name}`,
              state: {
                name : person?.name,
                profileImage : person?.attributes?.userImage?.data.attributes.formats.medium.url,
                content : person?.attributes?.content,
                role : person?.attributes?.role,
                email : person?.attributes?.email,
                keyProj: person?.attributes?.keyProjects?.split(","),
                url: person?.attributes?.personalUrl,
                fb: person?.attributes?.facebook,
                insta: person?.attributes?.instagram,
                lnkd: person?.attributes?.linkedin
              }
            }}>
              <div key={idx} className={styles.peopleCard}>
                <img
                  className={styles.imageContainer}
                  src={`${BASE_IMG_URL+person?.attributes?.userImage?.data.attributes.formats.medium.url}`}
                  alt="1"
                />
              </div>
              <div className={styles.card_overlay}>
                <p style={{whiteSpace:"pre-wrap"}}>
                  {person?.attributes?.name}
                </p>
              </div>
            </Link>
          </>
        ))}
      </div>
    </>
  );
}

export default TeamList;
