import React from "react";
import classes from './TourResult.module.css';
import ThumbedImage from "../../components/UI/ImageLoading/ThumbedImage";
import Justicon from "../../components/UI/JustIcon/Justicon";
import Separator from "../../components/UI/Separator/Separator";
import { Link } from "react-router-dom";
import LocationsVisualizer from "../SearchResults/LocationsVisualizer";
import UserAvatar from "../../components/UI/UserAvatar/UserAvatar";

export default function TourResult(props) {
    const { tours, searchLocation, searchCountry } = props;
    return (
        <div className={classes.tourResults}>
            {tours.map(tour => (
                <div className={classes.tour} key={tour._id}>
                    <Link to={`/tour/${tour.slug}`} className={classes.tourLinkAbsolute}/>
                    <Link to={`/tour/${tour.slug}`} className={classes.titleLink}>
                        <div className={classes.imageFrame}>
                            <ThumbedImage src={tour.imageCover} className={classes.image} alt={tour.name}/>
                        </div>
                    </Link>

                    <div className={classes.tourInfo}>
                        <div className={classes.top}>
                            <div className={classes.title}>
                                <div className={classes.locInfo}>
                                    <div className={classes.distance}>
                                        <Justicon icon="map" className={classes.locIcon}/>
                                        <h2>{Math.ceil(tour.distance)}</h2>
                                        <h3>&nbsp;km from {searchLocation}, {searchCountry}</h3>
                                    </div>
                                    <div className={classes.location}>
                                        <Justicon icon="map-pin" className={classes.locIcon}/>
                                        <h2>{tour.startLocation.description}</h2>
                                    </div>
                                </div>
                                <Link to={`/tour/${tour.slug}`} className={classes.titleLink}>
                                    <h1>{tour.name}</h1>
                                </Link>
                            </div>
                            <button className={classes.saveBig}>
                                <Justicon icon="heart" className={classes.saveBigIcon}/>
                            </button>
                        </div>
                        <div className={classes.separator}><Separator color='normal' width='4' margin='1 1'/></div>
                        <div className={classes.middle}>
                            <div className={classes.locs}>
                                {!!tour.locations.length && (
                                    <LocationsVisualizer locations={tour.locations}/>
                                )}
                            </div>
                            <div className={classes.guides}>
                                <Link to={`/user/${tour.author._id}`} className={classes.guideLink}>
                                    <div className={classes.guidePhotoFrame}>
                                        <UserAvatar src={tour.author.photo}
                                                    className={classes.guidePhoto}
                                                    alt={tour.author.name}/>
                                    </div>
                                </Link>
                                {tour.guides.map(guide => {
                                    return (
                                        <Link to={`/user/${guide._id}`}
                                              key={guide._id}
                                              className={classes.guideLink}>
                                            <div className={classes.guidePhotoFrame}>
                                                <UserAvatar src={guide.photo}
                                                            className={classes.guidePhoto}
                                                            alt={guide.name}/>
                                            </div>
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                        <div className={classes.bottom}>
                            <div className={classes.rating}>
                                <Justicon icon='star' className={classes.ratingIcon}/>
                                <h1>{tour.ratingsAverage}</h1>
                                <p>|</p>
                                <h2>({tour.ratingsQuantity})</h2>
                            </div>
                            <div className={classes.price}>
                                <h1>
                                    ${tour.price}
                                </h1>
                                <h2>
                                    &nbsp;/ person
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}