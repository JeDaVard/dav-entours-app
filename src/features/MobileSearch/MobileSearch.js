import React from "react";
import classes from './MobileSearch.module.css';
import { useQuery } from "@apollo/client";
import { FETCH_RECOMMENDED } from "../SearchResults/queries";
import Recommended from "../Search/Recommended";
import ThumbedImage from "../../components/UI/ImageLoading/ThumbedImage";
import Justicon from "../../components/UI/JustIcon/Justicon";
import {Link} from "react-router-dom";
import UserAvatar from "../../components/UI/UserAvatar/UserAvatar";
import ScrollToTop from "../../components/UI/ScrollToTop";

export default function MobileSearch() {
    const { loading, data} = useQuery(FETCH_RECOMMENDED);
    return (
        <div>
            <ScrollToTop />
            <div className={classes.topPlaceHolder}/>
            <div className={classes.container}>
                {!loading && data && !!data.recommended.length ? data.recommended.slice(0,4).map(rec => (
                    <div className={classes.tour} key={rec._id}>
                        <div className={classes.imageFrame}>
                            <ThumbedImage src={rec.imageCover} className={classes.image} alt={rec.name}/>
                        </div>
                        <div className={classes.rating}>
                            <Justicon icon="star"/>
                            <h2>{rec.ratingsAverage}</h2>
                            <p>|</p>
                            <h3>({rec.ratingsQuantity})</h3>
                        </div>
                        <Link to={`/tour/${rec.slug}`} className={classes.globalLink}/>
                        <div className={classes.bottom}>
                            <div className={classes.price}>
                                <div className={classes.location}>
                                    <div>
                                        <Justicon icon="map-pin" className={classes.locIcon}/>
                                    </div>
                                    <div>
                                        <h4>
                                            {rec.startLocation.address}
                                        </h4>
                                    </div>
                                </div>
                                <h2>${rec.price}</h2>
                            </div>
                            <div className={classes.title}>
                                <Link to={`/tour/${rec.slug}`} className={classes.globalLink}/>
                                <Link to={`/user/${rec.author._id}`} className={classes.authorLink}>
                                    <UserAvatar alt={rec.author.name}
                                                className={classes.author}
                                                src={rec.author.photo}/>
                                </Link>
                                    <h1>{rec.name}</h1>
                            </div>
                        </div>
                    </div>
                )) : (
                    [1,2,3,4].map(loader => (
                        <div className={classes.tour} key={loader}>
                            <div className={classes.imageFrame}>
                                <div className={classes.image} />
                            </div>
                        </div>))
                )}
            </div>
            <div className={classes.recommended}>
                {data && !!data.recommended.length && (
                    <Recommended tours={data.recommended.slice(4,8)}/>
                )}
            </div>
        </div>
    )
}