import React, {useState , useEffect, createContext} from "react"
import { BASE_URL } from "../constants";
import axios from 'axios';
import { useLocation } from "react-router-dom";

export const ProjectContext = createContext();

export const ProjectProvider = props => {
    let location = useLocation();
    // console.log(location)
    const [project , setProject] = useState();

    useEffect(() => {
        async function fetchData() {
          await axios.get(`${BASE_URL}blogs?filters[slug][$eq]=${location.pathname.split('/')[2]}&populate=*`)
          .then((response) => {
            // console.log(response.data.data[0].attributes)
            setProject(response.data.data[0].attributes);
          })
          .catch((err) => {
            console.log(err);
          });
        }
        fetchData();
      }, []);

    return(
        <ProjectContext.Provider value={project}>
            {props.children}
        </ProjectContext.Provider>
    )
}

ProjectContext.displayName = "Project";