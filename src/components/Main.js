import React from 'react';
import HomePage from '../pages/HomePage/HomePage'
// import Header from './Header/Header';
import WorksPage from '../pages/WorksPage/WorksPage';
import {Switch, Route, Redirect} from "react-router-dom";
import ProjectPage from '../pages/ProjectsPage/ProjectPage';
import StudioPage from '../pages/StudioPage/StudioPage';
import ContactPage from '../pages/ContactPage/contactPage';
import NewsDiv from '../pages/StudioPage/components/newsDiv';
import PeopleDiv from '../pages/StudioPage/components/peopleDiv';
import ClientDiv from '../pages/StudioPage/components/clientDiv';
import PeoplePage from '../pages/PeoplePage/peoplePage';
import { BannerProvider } from '../contexts/contexts';
import { BlogProvider  } from '../contexts/blogContext';
import { ProjectProvider } from '../contexts/projectContext';


export default function Main() {


    return (
        <>
            <Switch>
                <Route path="/home" component={()=><HomePage />} />
                <Route path="/works" component={()=>< BlogProvider><WorksPage /></BlogProvider>} />
                <Route path="/projects/:slug" exact component={()=>< ProjectProvider><ProjectPage /></ProjectProvider>} />
                <Route path="/team/:slug" exact component={()=><PeoplePage />} />
                <Route path="/studio" component={()=><BannerProvider><StudioPage /></BannerProvider>} />
                <Route path="/contact" component={()=><BannerProvider><ContactPage /></BannerProvider>} />
                <Route path="/news" component={()=><StudioPage><NewsDiv /></StudioPage>} />
                <Route path="/people" component={()=><StudioPage><PeopleDiv /></StudioPage>} />
                <Route path="/clients" component={()=><StudioPage><ClientDiv /></StudioPage>} />
                <Redirect to="/home" />
            </Switch>
        </>
    )
}
