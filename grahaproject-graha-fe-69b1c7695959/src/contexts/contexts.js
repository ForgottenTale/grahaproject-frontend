import React, {useState , useEffect, createContext} from "react"
import { BASE_URL } from "../constants";
import axios from 'axios';

export const AboutContext = createContext();
export const NewsContext = createContext();
export const PeopleContext = createContext();
export const BannerContext = createContext();


export const AboutProvider = props => {

    const [about, setAbout] = useState(null);

    useEffect(() => {
        axios.get(BASE_URL + 'about-us')
          .then((about) => {
            setAbout(about.data.data.attributes);
          });
    }, []);

    return(
        <AboutContext.Provider value={about}>
            {props.children}
        </AboutContext.Provider>
    )
}

export const NewsProvider = props => {

    const [news, setNews] = useState([]);

    useEffect(() => {
        axios.get(BASE_URL + "infos?sort[0]=priority%3Aasc&populate=*")
            .then((news) => {
              setNews(news.data.data);
            });
    }, []);

    return(
        <NewsContext.Provider value={news}>
            {props.children}
        </NewsContext.Provider>
    )

}

export const PeopleProvider = props => {

    const [teams, setTeam] = useState([]);

    useEffect(() => {
      axios.get(BASE_URL + "teams?populate=*")
        .then((teams) => {
          setTeam(teams.data.data);
        });
    }, []);

    return(
        <PeopleContext.Provider value={teams}>
            {props.children}
        </PeopleContext.Provider>
    )

}

export const BannerProvider = props => {

  const [banner, setBanner] = useState([]);

  useEffect(() => {
    axios.get(BASE_URL + "studio-banner?populate=*")
      .then((ban) => {
        setBanner(ban.data.data.attributes);
      });
  }, []);

  return(
      <BannerContext.Provider value={banner}>
          {props.children}
      </BannerContext.Provider>
  )

}

AboutContext.displayName = "About";
PeopleContext.displayName = "People";
NewsContext.displayName = "News";
BannerContext.displayName = "Banners";