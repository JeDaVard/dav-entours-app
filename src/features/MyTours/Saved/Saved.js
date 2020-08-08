import React from 'react';
import { Link } from 'react-router-dom';
import { Query } from '@apollo/client/react/components';
import { useMutation } from '@apollo/client';
import { FETCH_SAVED, REMOVE_SAVED_TOUR } from './queries';
import moment from 'moment';
import classes from './Saved.module.css';
import Justicon from '../../../components/UI/JustIcon/Justicon';
// import Separator from '../../components/UI/Separator/Separator';
import TopLoading from '../../../components/UI/TopLoading/TopLoading';
import ThumbedImage from "../../../components/UI/ImageLoading/ThumbedImage";

function Saved() {
    const [ removeSavedTour, {loading} ] = useMutation(REMOVE_SAVED_TOUR)
    return (
        <section>
            { loading && <TopLoading /> }
            <div className={classes.Saved}>
            {/*    <h1 className={classes.name}>Saved</h1>*/}
            {/*    <Separator margin={'0 2'} color={'normal'} />*/}
                <div className={classes.content}>
                    <Query query={FETCH_SAVED}>
                        {
                            ({loading, error, data}) => {
                                if (loading) return <TopLoading />
                                if (error) return <h1>Error while fetching saved tours</h1>
                                return (
                                    <>
                                        {data.me.saved.map((tour) => (
                                            <div className={classes.item}
                                                 key={tour.slug}>
                                                <Link to={`/tour/${tour.slug}`}>
                                                    <div className={classes.imageFrame}>
                                                        <div className={classes.box1}>
                                                            <ThumbedImage
                                                                src={tour.images[0]}
                                                                className={classes.image}
                                                                alt={tour.name}
                                                                blur />
                                                        </div>
                                                        <div className={classes.box2}>
                                                            <div className={classes.box2c1}>
                                                                 <ThumbedImage
                                                                src={tour.images[1]}
                                                                className={classes.image}
                                                                alt={tour.name}
                                                                blur />
                                                            </div>
                                                            <div className={classes.box2c2}>
                                                                 <ThumbedImage
                                                                src={tour.images[2]}
                                                                className={classes.image}
                                                                alt={tour.name}
                                                                blur />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                                <div className={classes.info}>
                                                    <div className={classes.infoAbove}>
                                                        <h4 className={classes.infoPart}>
                                                            Participants {tour.starts.length && tour.starts[0].participants.length}/
                                                            {tour.maxGroupSize}
                                                        </h4>
                                                        <div className={classes.rating}>
                                                            <h3>{tour.ratingsAverage}</h3>&nbsp;<Justicon icon={'star'}/>
                                                        </div>
                                                    </div>
                                                    <Link to={'/'}>
                                                        <h2 className={classes.title}>
                                                            {tour.name}
                                                        </h2>
                                                    </Link>
                                                    <div className={classes.infoBottom}>
                                                        <p>{tour.startLocation.description}</p>
                                                        <p>
                                                            {tour.starts.length &&
                                                                moment(+tour.starts[0].date).format(
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
                                                        className={classes.remove}>
                                                            <Justicon
                                                                icon={'heart'}
                                                                className={
                                                                    classes.removeIcon
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
