import React from 'react';
import { connect } from 'react-redux';
import classes from './TourHead.module.css';
import {CSSTransition} from "react-transition-group";
import '../animation.css'

function TourHead(props) {
    const { tour, loading } = props;
    return (
        <div className={classes.TourHead__cover}>
            <CSSTransition
                in={!loading}
                timeout={300}
                classNames="coverImage"
                unmountOnExit
            >
                <img
                    src={`${process.env.REACT_APP_SERVER}/images/tour/${tour.imageCover}`}
                    alt=""
                />
            </CSSTransition>
            <div className={'row'}>
                <CSSTransition
                    in={!loading}
                    timeout={400}
                    classNames="tourTitle"
                    unmountOnExit
                >
                    <div className={classes.TourHead}>
                        <div className={classes.TourHead__left}>
                            <div className={classes.TourHead__hash}>
                                {!loading &&
                                    (tour.hashtags ? (
                                        tour.hashtags.map((hash) => (
                                            <p key={hash}>#{hash}</p>
                                        ))
                                    ) : (
                                        <p>0 hashtags</p>
                                    ))}
                            </div>
                            <h2>{tour.name}</h2>
                            <h4>
                                {tour.startLocation &&
                                    tour.startLocation.description}
                            </h4>
                        </div>
                    </div>
                </CSSTransition>
                <CSSTransition
                    in={!loading}
                    timeout={600}
                    classNames="tourBottom"
                    unmountOnExit
                >
                <>
                    {!loading && (
                        (
                            <div className={classes.TourHead__info}>
                                <p>
                                    NEXT DATE:{' '}
                                    <b>
                                        {tour.startLocation &&
                                        new Date(
                                            tour.startDates[0]
                                        ).toLocaleDateString()}
                                    </b>
                                </p>
                                <p>
                                    DIFFICULTY: <b>{tour.difficulty}</b>
                                </p>
                                <p>
                                    PARTICIPANTS:{' '}
                                    <b>
                                        {tour.participants.length
                                            ? tour.participants.length + ' Participants'
                                            : 'Be the first'}
                                    </b>
                                </p>
                            </div>
                        )
                    )}
                    </>
                </CSSTransition>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    tour: state.feed.tour.data,
    loading: state.feed.tour.loading,
});

export default connect(mapStateToProps)(TourHead);
