import React, { useContext, useEffect} from "react";
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer";
import styles from "./studioPage.module.css";
import NewsDiv from "./components/newsDiv";
import PeopleDiv from "./components/peopleDiv";
import AboutDiv from "./components/aboutDiv";
import {Helmet} from "react-helmet";
import Headroom from "react-headroom"
import { AboutContext, AboutProvider, BannerContext, NewsProvider } from "../../contexts/contexts";

function StudioPage() {
  // // const [loading, setLoading] = useState(true);
  // const Header = React.lazy(() => import('../../components/Header/Header'));
  // const NewsDiv  = React.lazy(() => import('./components/newsDiv'));

  const navItems = [
    {
      title : "about",
      cName : '/studio'
    },
    {
      title : "news",
      cName : '/news'
    },
    {
      title : "people",
      cName : '/people'
    },
  ]
  // const [count , setCount] = useState(0);

  useEffect(() => {
    // console.log(window.performance.getEntriesByType("navigation")[0].type === "navigate")
    // console.log(window.scrollY)
    window.history.replaceState('', document.title, window.location.origin + window.location.pathname + window.location.search);
    window.location.hash = "about";
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    window.addEventListener('popstate', (event) => { console.log(event) });
  }, [])

  const about = useContext(AboutContext);
  const banner = useContext(BannerContext);

  const [scrolled,setScrolled]=React.useState(false);
  const handleScroll=() => {
    const offset=window.scrollY;
    if(offset > 200 ){
      setScrolled(true);
    }
    else{
      setScrolled(false);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll',handleScroll)
  })
  let navbarClasses=['navbar'];
  if(scrolled){
    navbarClasses.push('scrolled');
  }

  return (
    <>
      
      
      <Helmet>
        <title>Graha | Studio</title>
      </Helmet>

      {/* <Suspense fallback={<Loader />}>
        
      </Suspense> */}

      <Header />
      
      
        {/* <BrowserRouter> */}

        <Headroom>
          <div className={styles.nav}>
            <ul>
              {navItems.map((item) => {
                return (
                  <li>
                    {/* <Link to={item.cName} className={styles.nav_links} activeStyle={styles.activeLink} >{item.title}</Link> */}
                    <a className={styles.nav_links} href={'#' + item.title} >{item.title}</a>
                  </li>
                );
              })}
            </ul>

          </div>
        </Headroom>
        
                
          <div className={styles.container}>
            <AboutProvider>
              <NewsProvider>
                <AboutDiv imagePath={banner && banner.aboutBanner} />
                <NewsDiv imagePath={banner && banner.newsBanner} />
                <PeopleDiv imagePath={banner && banner.peopleBanner} teamList={about && about.teamList} associates={about && about.associates} />
              {/* <ClientDiv imagePath={banner && banner.contactBanner} /> */}
              </NewsProvider>
            </AboutProvider>
          </div>
        {/* </BrowserRouter> */}

        <Footer />

    </>
  );
}

export default StudioPage;
