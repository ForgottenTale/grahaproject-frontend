import React, {useState , useEffect, createContext} from "react"
import { BASE_URL } from "../constants";

export const BlogContext = createContext();

export const BlogProvider = props => {

    const [blogs , setBlogs] = useState([]);
    const [blogLength , setBlogsLength] = useState(100);

    useEffect(() => {
        fetch(BASE_URL + "blogs?populate=*&sort[0]=priority%3Aasc&pagination[limit]=1000")
          .then((response) => {
            if (response.status >= 400) {
              throw new Error("Bad Response from Server");
            }
            return response.json();
          })
    
          .then((blogs) => {
            setBlogs(blogs.data);
            setBlogsLength(blogs.data.length);
          });
      }, []);

    return(
        <BlogContext.Provider value={[blogs , [blogLength , setBlogsLength]]}>
            {props.children}
        </BlogContext.Provider>
    )
}

BlogContext.displayName = "Blogs";