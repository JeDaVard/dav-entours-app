import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchUserSaved } from '../../app/actions';
import classes from './Saved.module.css';
import Justicon from '../../components/UI/Justicon';
import Separator from '../../components/UI/Separator/Separator';
import TopLoading from '../../components/UI/TopLoading/TopLoading';
import ThumbedImage from "../../utils/ImageLoading/ThumbedImage";

function Saved(props) {
    const { fetchUserSaved, saved, loading } = props;

    useEffect(() => {
        fetchUserSaved();
    }, [fetchUserSaved]);

    return (
        <section className="row">
            <div className={classes.Saved}>
                <h1 className={classes.Saved__name}>Saved</h1>
                <Separator margin={'0 2'} color={'normal'} />
                <div className={classes.Saved__content}>
                    {loading && !saved.length ? (
                        <TopLoading />
                    ) : (
                        saved.map((tour) => (
                            <div
                                className={classes.Saved__item}
                                key={tour.slug}
                            >
                                <Link to={`/tour/${tour.slug}`}>
                                    <div className={classes.Saved__imageFrame}>
                                        <div className={classes.Saved__box1}>
                                            <ThumbedImage
                                                src={`${process.env.REACT_APP_SERVER}/images/tour/${tour.images[0]}`}
                                                thumb={`${process.env.REACT_APP_SERVER}/images/tour/${tour.images[0].slice(0, tour.images[0].length-4)}.thumb.jpeg`} blur={true}
                                                className={classes.Saved__image}
                                                alt={tour.name}
                                            />
                                        </div>
                                        <div className={classes.Saved__box2}>
                                            <div className={classes.Saved__box2c1}>
                                                <ThumbedImage
                                                    src={`${process.env.REACT_APP_SERVER}/images/tour/${tour.images[1]}`}
                                                    thumb={`${process.env.REACT_APP_SERVER}/images/tour/${tour.images[1].slice(0, tour.images[1].length-4)}.thumb.jpeg`} blur={true}
                                                    className={classes.Saved__image}
                                                    alt={tour.name}
                                                />
                                            </div>
                                            <div className={classes.Saved__box2c2}>
                                                <ThumbedImage
                                                    src={`${process.env.REACT_APP_SERVER}/images/tour/${tour.images[2]}`}
                                                    thumb={`${process.env.REACT_APP_SERVER}/images/tour/${tour.images[2].slice(0, tour.images[2].length-4)}.thumb.jpeg`} blur={true}
                                                    className={classes.Saved__image}
                                                    alt={tour.name}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                <div className={classes.Saved__info}>
                                    <div className={classes.Saved__infoAbove}>
                                        <h4 className={classes.Saved__infoPart}>
                                            Participants {tour.participants.length}/
                                            {tour.maxGroupSize}
                                        </h4>
                                        <div className={classes.Saved__rating}>
                                            <h3>{tour.ratingsAverage}</h3>&nbsp;<Justicon icon={'star'}/>
                                        </div>
                                    </div>
                                    <Link to={'/'}>
                                        <h2 className={classes.Saved__title}>
                                            {tour.name}
                                        </h2>
                                    </Link>
                                    <div className={classes.Saved__infoBottom}>
                                        <p>{tour.startLocation.description}</p>
                                        <p>
                                            {moment(tour.startDates[0]).format(
                                                'ddd, DD MMM YYYY'
                                            )}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <Link to={`/tour/${tour.slug}`}>
                                        <div className={classes.Saved__remove}>
                                            <Justicon
                                                icon={'trash'}
                                                className={
                                                    classes.Saved__removeIcon
                                                }
                                            />
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}

const mapsStateToProps = (state) => ({
    saved: state.user.me.saved.data,
    loading: state.user.me.saved.loading,
});

export default connect(mapsStateToProps, { fetchUserSaved })(Saved);
