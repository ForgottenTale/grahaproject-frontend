import React, {useState, useEffect, useContext} from "react";
import styles from "./styles/contactPage.module.css"
import Helmet from "react-helmet";
import HomePageContents from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import logo from "../../assets/images/logos/graha-black.png";
// import Loader from "../../components/Loader/loader";
import { BannerContext } from "../../contexts/contexts";
import { BASE_URL,BASE_IMG_URL  } from "../../constants";
import axios from 'axios';

const ContactPage = () => {

    const [contact, setCon] = useState(null);
    // const [loading, setLoading] = useState(true);
    const banner = useContext(BannerContext);

    

    useEffect(() => {
      axios.get(BASE_URL + "contact-us")
        .then((contact) => {
          setCon(contact.data.data.attributes);
        });
    }, []);

    console.log(contact)

    return(
        <>
        <Helmet>
          <title>Graha | Contact</title>
        </Helmet>

      
      <HomePageContents pageLogo={logo}  />
      
      <div
          className={styles.contactPage}
          >
          
          <div className={styles.mediaBox} id="contact" style={{backgroundImage: `url(${BASE_IMG_URL +(banner && banner?.contactBanner?.data?.attributes?.url)})`}}><h1></h1></div>
  
          <span>
              <div className={styles.map}>
                {/* <img alt="map" src={map} /> */}
                  {/* <div
                    style={{backgroundImage: `url(${map})`}}
                    className={styles.mapImage}
                  >
                  </div>
                  <a href={contact && contact.mapUrl} target="_blank" rel="noreferrer">
                      <FontAwesomeIcon
                      className={styles.mapMarker}
                      size="1x"
                      icon={faMapMarkerAlt}
                      />
                  </a> */}
              </div>

              <div className={styles.info}>

                  {/* <img src={graha} alt="GRAHA" style={{ float: "right" }} /> */}
                  <br />
                  <p>{contact && contact?.addressLine_1}</p>
                  <p>{contact && contact?.addressLine_2}</p>
                  <p>{contact && contact?.addressLine_3}</p>

                  <div className={styles.contactInfo}>
                    <h1>{contact && contact.contactText}</h1>
                    <h3><a href={`mailto:${contact && contact?.email}`}>{contact && contact?.email}</a></h3>
                    <h1 className={styles.mobile}>+91-{contact && contact.phone }</h1>
                  </div>
                  
                  
      
              </div>
          </span>
      </div>

      <Footer></Footer>
            
        </>
    )

}

export default ContactPage;