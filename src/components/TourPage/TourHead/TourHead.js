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
    const [ saveTour ] = useMutation(SAVE_TOUR)
    const onSaveTour = e => {
        e.preventDefault();

        saveTour({
            variables: {
                id: tour._id
            }
        })
    }

    return (
        <div className={classes.cover}>
            <ThumbedImage
                src={tour.imageCover}
                className={classes.coverImage}
                alt={tour.name}
                XL
                blur
            />
            <div className={'row'}>
                <div className={classes.shareBox}>
                    <button className={classes.share}>
                        <Justicon icon={'upload'} className={classes.shareIcon}/>
                        <b>Share</b>
                    </button>
                    <button onClick={onSaveTour} className={classes.share}>
                        <Justicon icon={'heart'} className={classes.shareIcon}/>
                        <b>Save</b>
                    </button>
                </div>
                <div className={classes.TourHead}>
                    <div className={classes.left}>
                        <div className={classes.hash}>
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
                            <Justicon icon={'map-pin'} className={classes.location} />{tour.startLocation.description}
                        </h4>
                    </div>
                </div>
                <div className={classes.bottom}>
                    <h3>{tour.summary}</h3>
                    <div className={classes.info}>
                        <p>
                            <Justicon icon={'calendar'} className={classes.icon}/>
                            <b>{moment(+tour.startDates[0]).format('ddd DD MMM YYYY')}</b>
                        </p>
                        <p>
                            <Justicon icon={'zap'} className={classes.icon}/>
                            <b>Level {tour.difficulty}</b>
                        </p>
                        <p>
                            <Justicon icon={'users'} className={classes.icon}/>
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
