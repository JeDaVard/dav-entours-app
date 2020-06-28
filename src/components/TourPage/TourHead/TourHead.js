import React from 'react';
import classes from './TourHead.module.css';
import '../animation.css';
import ThumbedImage from '../../../utils/ImageLoading/ThumbedImage';
import moment from "moment";
import Justicon from "../../UI/Justicon";
import {useMutation} from "react-apollo";
import { SAVE_TOUR } from "../../../containers/Saved/queries";

function TourHead(props) {
    const { tour } = props;
    const [ saveTour, {loading} ] = useMutation(SAVE_TOUR)
    const onSaveTour = e => {
        e.preventDefault();

        saveTour({
            variables: {
                id: tour._id
            }
        })
    }

    return (
        <div className={classes.TourHead__cover}>
            <ThumbedImage
                src={tour.imageCover}
                className={classes.TourHead__coverImage}
                alt={tour.name}
                XL
                blur
            />
            <div className={'row'}>
                <div className={classes.TourHead__shareBox}>
                    <button className={classes.TourHead__share}>
                        <Justicon icon={'upload'} className={classes.TourHead__shareIcon}/>
                        <b>Share</b>
                    </button>
                    <button onClick={onSaveTour} className={classes.TourHead__share}>
                        <Justicon icon={'heart'} className={classes.TourHead__shareIcon}/>
                        <b>Save</b>
                    </button>
                </div>
                <div className={classes.TourHead}>
                    <div className={classes.TourHead__left}>
                        <div className={classes.TourHead__hash}>
                            {tour.hashtags ? (
                                tour.hashtags.map((hash) => (
                                    <p key={hash}>#{hash}</p>
                                ))
                            ) : (
                                <p>0 hashtags</p>
                            )}
                        </div>
                        <h2>{tour.name}</h2>
                        <h4>
                            <Justicon icon={'map-pin'} className={classes.TourHead__location} />{tour.startLocation.description}
                        </h4>
                    </div>
                </div>
                <div className={classes.TourHead__bottom}>
                    <h3>{tour.summary}</h3>
                    <div className={classes.TourHead__info}>
                        <p>
                            <Justicon icon={'calendar'} className={classes.TourHead__icon}/>
                            <b>{moment(+tour.startDates[0]).format('ddd DD MMM YYYY')}</b>
                        </p>
                        <p>
                            <Justicon icon={'zap'} className={classes.TourHead__icon}/>
                            <b>Level {tour.difficulty}</b>
                        </p>
                        <p>
                            <Justicon icon={'users'} className={classes.TourHead__icon}/>
                            <b>{tour.participants.length
                                ? tour.participants.length + ' / ' + tour.maxGroupSize + ' people'
                                : 'Be the first'}</b>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TourHead
