import React, { useContext } from "react";
import { NewsContext } from "../../../contexts/contexts";
import styles from "./styles/newsDiv.module.css"
import { BASE_IMG_URL } from "../../../constants"

const NewsDiv = (props) => {

    const news = useContext(NewsContext);
    console.log(news)
    return (
        <>

            <div className={styles.newsPage}>
                <div className={styles.mediaBox} id="news" style={{ backgroundImage: `url(${BASE_IMG_URL + props?.imagePath?.data.attributes.url})` }}><h1>News</h1></div>
                {
                    news.map((info, idx) => (
                        <>
                            <div key={idx} className={styles.newsContainer}>
                                <div
                                    className={styles.newsMedia}
                                    style={{
                                        backgroundImage: `url(${BASE_IMG_URL + info?.attributes?.newsMedia?.data?.attributes.url})`,
                                    }}
                                ></div>

                                <div className={styles.newsContent}>
                                    <br />
                                    <h1>{info?.attributes?.newsTitle}</h1>
                                    <p>{info?.attributes?.newsDesc}</p>
                                    {
                                        info?.attributes?.url ?
                                            <p className={styles.infoLink}><strong>Learn More: </strong><a href={info?.attributes?.url} target="_blank" rel="noopener noreferrer" style={{ 'userSelect': 'all', 'textDecoration': 'none', 'color': 'inherit' }}>{info?.attributes?.url}</a></p>
                                            : null
                                    }
                                </div>

                            </div>
                        </>
                    ))}
            </div>
        </>
    )

}

export default NewsDiv;