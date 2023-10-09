import React, {useState, useEffect} from "react";
import graha from "../../../assets/images/logos/graha-white-thin.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles/contactDiv.module.css"
import map from "../../../assets/images/map.jpg";
import { BASE_URL } from "../../../constants";

const ClientDiv = (props) => {

    const [contact, setCon] = useState(null);


  
    useEffect(() => {
      fetch(BASE_URL + 'contact-us')
        .then((response) => {
          if (response.status >= 400) {
            console.log("Fetch error");
            throw new Error("Bad Response from Server");
          }
          return response.json();
        })
  
        .then((contact) => {
          setCon(contact);
        });
    }, []);

    return(
        <>

           

            <div
                // initial={{ opacity: 0, x: -100 }}
                // animate={{ opacity: 1, x: 0 }}
                // exit={{ opacity: 0, x: 100 }}
                // transition={{ duration: 1 }}
                
                className={styles.contactPage}
            >
                
                <div className={styles.mediaBox} id="clientale" style={{backgroundImage: `url(${props.imagePath.url})`}}><h1>Clientale</h1></div>
        
                <span>
                    <div className={styles.map}>
                        <img alt="map" src={map} />
                        <a href={contact && contact.mapUrl} target="_blank" rel="noreferrer">
                            <FontAwesomeIcon
                            className={styles.mapMarker}
                            size="1x"
                            icon={faMapMarkerAlt}
                            />
                        </a>
                    </div>

                    <div className={styles.info}>
                        <div className={styles.infoBox1}>
                            <div className={styles.dGrey}>Jobs | Internships</div>
                            <p style={{ float: "right" }}>
                            <a href={`mailto:${contact && contact.email}`}>{contact && contact.email}</a>
                            </p>
                        </div>
                        <div className={styles.infoBox2}>
                            <img src={graha} alt="GRAHA" style={{ float: "right" }} />
                            <br />
                            <p style={{ marginBottom: "95px" }}>{contact && contact.address}</p>
                            <p style={{ paddingLeft: "120px" }}>
                            <a href="tel:1234567890">{contact && contact.phone}</a>
                            </p>
                            <p style={{ float: "right" }}>
                            <a href={`mailto:${contact && contact.email}`}>{contact && contact.email}</a>
                            </p>
                        </div>
                    </div>
                </span>
            </div>
        </>
    )

}

export default ClientDiv;