import React, {useEffect, useState} from "react";
import {NavLink, Route, Switch, useParams} from 'react-router-dom';
import { useQuery } from "@apollo/react-hooks";
import classes from './EditTour.module.css';
import {FETCH_EDIT_TOUR} from "./queries";
import p1c from './1c2.jpg'
import EditHeading from "./EditHeading/EditHeading";
import EditLocations from "./EditLocations/EditLocations";
import EditGallery from "./EditGallery/EditGallery";
import EditDetails from "./EditDetails/EditDetails";
import TopLoading from "../../components/UI/TopLoading/TopLoading";

function EditTour(props) {
    const { slug } = useParams();

    const {loading, error, data } = useQuery(FETCH_EDIT_TOUR, {
        variables: { slug },
        // onCompleted: () => {
        //     setState({...data.me.myTour})
        // }
    });

    if (loading) return <TopLoading />
    if (error) return <h1>Error while fetching the tour</h1>

    return (
        <div className={classes.editPage}>
            <div className={classes.editTop}>
                <div className={classes.imageFrame}>
                    <img src={p1c} className={classes.image} alt=""/>
                    <div className={classes.title}>
                        <h1>Be creative. Get more</h1>
                    </div>
                </div>
            </div>
            <div className={classes.main}>
                <div className={classes.top}>
                    <nav className={classes.editNav}>
                        <NavLink
                            to={`/tour/${slug}/edit/heading`}
                            activeClassName={classes.navItemActive}
                            className={classes.navItem}>
                            Heading
                        </NavLink>
                        <NavLink
                            to={`/tour/${slug}/edit/locations`}
                            activeClassName={classes.navItemActive}
                            className={classes.navItem}>
                            Locations
                        </NavLink>
                        <NavLink
                            to={`/tour/${slug}/edit/gallery`}
                            activeClassName={classes.navItemActive}
                            className={classes.navItem}>
                            Gallery
                        </NavLink>
                        <NavLink
                            to={`/tour/${slug}/edit/details`}
                            activeClassName={classes.navItemActive}
                            className={classes.navItem}>
                            Details
                        </NavLink>
                    </nav>
                </div>
            </div>
            <Switch>
                <Route path="/tour/:slug/edit/heading" render={_ => <EditHeading {...data.me.myTour} />}/>
                <Route path="/tour/:slug/edit/locations" render={_ => <EditLocations {...data.me.myTour} />} />
                <Route path="/tour/:slug/edit/gallery" render={_ => <EditGallery {...data.me.myTour} />} />
                <Route path="/tour/:slug/edit/details" render={_ => <EditDetails {...data.me.myTour} />} />
            </Switch>
            <div className={classes.bottomPadding} />
        </div>
    )
}

export default EditTour