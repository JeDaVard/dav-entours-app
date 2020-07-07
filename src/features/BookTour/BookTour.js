import React from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import qs from 'query-string';
import classes from './BookTour.module.css';
import SimpleMobileTop from "../../components/SimpleMobileTop/SimpleMobileTop";
import {useQuery} from "@apollo/react-hooks";
import {FETCH_TOUR_FOR_ORDER} from "./queries";
import SmoothImage from "../../components/UI/ImageLoading/SmoothImage";
import LocLink from "../../components/UI/LocLink/LocLink";

function BookTour() {
    const { location } = useHistory();
    const parsedData = qs.parse(location.search);

    const { data, error, loading } = useQuery(FETCH_TOUR_FOR_ORDER, {
        variables: { id: parsedData.slug }
    })
    if (!parsedData.slug || !parsedData.start) return <Redirect to={'/'}/>

if (loading) return <p>loading...</p>
    const { tour } = data;

    const start = data.tour.starts.find(start => start._id === parsedData.start);

    return (
        <div className={classes.main}>
            <SimpleMobileTop
                to={`/mytours`}
                icon={'check'}
                children={'Order'}
                shadow
                // fixed
                top
            />
            <div className={classes.content}>
                <div className={classes.conv}>
                    <div>conv hello</div>
                    <div>conv from this user now</div>
                </div>
                <div className={classes.tour}>
                    <div className={classes.details}>
                        <div className={classes.imageFrame}>
                            <SmoothImage src={tour.imageCover}
                                         className={classes.image}
                                         alt={tour.name}/>
                        </div>
                        <div className={classes.info}>
                            <div className={classes.nameFrame}>
                                <h2 className={classes.name}>{tour.name}</h2>
                                <LocLink
                                    className={classes.loc}
                                    address={tour.startLocation.address}
                                    coordinates={['asd']}/>
                            </div>
                            <div className={classes.rating}>rating</div>
                        </div>
                    </div>
                    <div className={classes.participation}>
                        <div className={classes.date}>{start.date}</div>
                        <div className={classes.datePrice}>{tour.price}</div>
                        <div className={classes.members}>
                            <div className={classes.addGuest}>
                                add others
                            </div>
                            <div className={classes.participants}>
                                <p>this user</p>
                                <p>others</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>privacy policy text and pay button</div>
            <div>price and payment, some details fixed bar</div>
        </div>
    )
}

export default BookTour