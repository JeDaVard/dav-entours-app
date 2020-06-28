import React from 'react';
import { Link } from 'react-router-dom';
import {Query, useMutation} from 'react-apollo';
import {FETCH_SAVED, REMOVE_SAVED_TOUR} from './queries';
import moment from 'moment';
import classes from './Saved.module.css';
import Justicon from '../../components/UI/Justicon';
import Separator from '../../components/UI/Separator/Separator';
import TopLoading from '../../components/UI/TopLoading/TopLoading';
import ThumbedImage from "../../utils/ImageLoading/ThumbedImage";

function Saved() {
    const [ removeSavedTour, {loading} ] = useMutation(REMOVE_SAVED_TOUR)
    return (
        <section className="row">
            { loading && <TopLoading /> }
            <div className={classes.Saved}>
                <h1 className={classes.Saved__name}>Saved</h1>
                <Separator margin={'0 2'} color={'normal'} />
                <div className={classes.Saved__content}>
                    <Query query={FETCH_SAVED}>
                        {
                            ({loading, error, data}) => {
                                if (loading) return <TopLoading />
                                if (error) return <h1>Error while fetching saved tours</h1>
                                return (
                                    <>
                                        {data.me.saved.map((tour) => (
                                            <div
                                                className={classes.Saved__item}
                                                key={tour.slug}
                                            >
                                                <Link to={`/tour/${tour.slug}`}>
                                                    <div className={classes.Saved__imageFrame}>
                                                        <div className={classes.Saved__box1}>
                                                            <ThumbedImage
                                                                src={tour.images[0]}
                                                                className={classes.Saved__image}
                                                                alt={tour.name}
                                                                blur />
                                                        </div>
                                                        <div className={classes.Saved__box2}>
                                                            <div className={classes.Saved__box2c1}>
                                                                 <ThumbedImage
                                                                src={tour.images[1]}
                                                                className={classes.Saved__image}
                                                                alt={tour.name}
                                                                blur />
                                                            </div>
                                                            <div className={classes.Saved__box2c2}>
                                                                 <ThumbedImage
                                                                src={tour.images[2]}
                                                                className={classes.Saved__image}
                                                                alt={tour.name}
                                                                blur />
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
                                                            {moment(+tour.startDates[0]).format(
                                                                'ddd, DD MMM YYYY'
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <button onClick={e => {
                                                        e.preventDefault();
                                                        removeSavedTour({
                                                            variables: {
                                                                id: tour._id
                                                            },
                                                            update(cache, res) {
                                                                console.log(res.data.removeSavedTour)
                                                                const { me } = cache.readQuery({query: FETCH_SAVED})
                                                                cache.writeQuery({
                                                                    query: FETCH_SAVED,
                                                                    data: { me: {
                                                                            ...me,
                                                                            saved: res.data.removeSavedTour
                                                                        }
                                                                    }
                                                                })
                                                            }
                                                        })
                                                    }}
                                                        className={classes.Saved__remove}>
                                                            <Justicon
                                                                icon={'heart'}
                                                                className={
                                                                    classes.Saved__removeIcon
                                                                }
                                                            />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                )
                            }
                        }
                    </Query>
                </div>
            </div>
        </section>
    );
}

export default Saved;
