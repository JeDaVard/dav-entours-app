import React from 'react';
import { Query } from '@apollo/client/react/components';
import { FETCH_DISCOVER } from "./queries";
import {Link} from "react-router-dom";
import classes from './Discover.module.css';
import DiscoverItem from './DiscoverItem';
import DiscoverItemLoading from './DiscoverItemLoading';
import DiscoverItemLoadingMobile from './DiscoverItemLoadingMobile';

function Discover(props) {
    return (
        <div className={classes.Discover}>
                    <div className="row">
                        <section className={classes.top}>
                            <div className={classes.description}>
                                <h1 className={classes.titleBox}>
                                    <div className={classes.title}>
                                        Top Tours
                                    </div>
                                </h1>
                                <div className={classes.text}>
                                    Choose from the top tours, always enjoy your travel.
                                    Discover the world
                                </div>
                            </div>
                            <div className={classes.link}>
                                <Link to={'/'}>Discover</Link>
                            </div>
                        </section>
                    </div>
                    <div className={classes.row}>
                        <div className={classes.gridParent}>
                            <Query query={FETCH_DISCOVER}>
                                {
                                    ({loading, error, data}) => {
                                        if (loading) return <>{props.isMobile ? <DiscoverItemLoadingMobile /> : <DiscoverItemLoading />}</>
                                        if (error) return <h1>Error while fetching discover</h1>
                                        return (
                                            <div className={classes.grid}>
                                                {data.tours.slice(4).map( discover => <DiscoverItem tour={discover} key={discover._id}/>)}
                                            </div>
                                        )
                                    }
                                }
                            </Query>
                        </div>

                        <div className={classes.mobileLink}>
                            <Link to={'/'}>Discover</Link>
                        </div>
                    </div>
        </div>
    );
}

export default Discover;
