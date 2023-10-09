import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./styles/peoplePage.css";
import { useLocation } from "react-router-dom";
import Helmet from "react-helmet";
import knowMore from "../../assets/images/know_more.png"
import axios from "axios";
import { BASE_URL } from "../../constants";

export default function PeoplePage() {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "auto",
        });
        window.history.scrollRestoration = "auto";
    }, []);

    const [person, setPerson] = useState();

    const slugify = str =>
        str
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');

    useEffect(() => {
        axios.get(`${BASE_URL}teams?populate=*&filters[slug][$eq]=${slugify(location.pathname.split('/')[2])}`)
            .then((person) => {
                setPerson(person.data.data[0]);
            });
    }, []);

    const location = useLocation();
    console.log(`${BASE_URL}teams?populate=*&filter[name][eq]=${encodeURIComponent(location.pathname.split('/')[2])}`)
    return (
        <>
            <Header />

            <Helmet>
                <title>{`Graha | ${person?.attributes.name}`}</title>
            </Helmet>


            <div className="profilePage">

                <div className="section">

                    <div className="profileImage">

                        <div className="imageBox"
                            style={{
                                backgroundImage: `url(${person?.attributes.userImage?.data.attributes.url})`
                            }}
                        >
                        </div>

                        <div className="socials">
                            <a rel="noreferrer" target="_blank" href={person?.attributes?.instagram ?? ""}><svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="instagram" class="svg-inline--fa fa-instagram" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg></a>

                            <a rel="noreferrer" target="_blank" href={person?.attributes?.facebook ?? ""}><svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook" class="svg-inline--fa fa-facebook" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.8 90.69 226.4 209.3 245V327.7h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.3 482.4 504 379.8 504 256z"></path></svg></a>

                            <a rel="noreferrer" target="_blank" href={person?.attributes?.linkedin ?? ""}><svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="linkedin-in" class="svg-inline--fa fa-linkedin-in" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M100.3 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.6 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.3 61.9 111.3 142.3V448z"></path></svg></a>
                        </div>
                    </div>

                    <div className="profileContent">

                        <div className="name">
                            {person?.attributes.name}
                        </div>

                        <div className="content">
                            {person?.attributes.content}
                        </div>

                        <div className="knowMoreSection">
                            <a target="_blank" rel="noopener noreferrer" href={person?.attributes?.personalUrl}>
                                <div className="knowMore" style={{ backgroundImage: `url(${knowMore})` }}></div>
                            </a>
                        </div>

                        <div className="keyProjects">
                            <div className="keyProjectsTitle">Key Projects</div>
                            <div className="keyProjectsList">
                                {
                                    person?.attributes?.keyProj && person?.attributes?.keyProj?.map((proj) => (
                                        <div className="keyItem" ><svg className="itemDash" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M400 288h-352c-17.69 0-32-14.32-32-32.01s14.31-31.99 32-31.99h352c17.69 0 32 14.3 32 31.99S417.7 288 400 288z" /></svg>
                                            {proj}
                                        </div>
                                    ))
                                }
                            </div>

                        </div>

                    </div>

                </div>


            </div>



            <Footer />
        </>
    );
}
