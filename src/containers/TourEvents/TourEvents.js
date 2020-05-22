import React, {useEffect} from "react";
import queryString from 'query-string';
import { connect } from 'react-redux';
import { Tabs, Tab} from "../../components/UI/Tabs/Tabs";
import {fetchUserTourEvents} from "../../app/actions";
import TopLoading from "../../components/UI/TopLoading/TopLoading";
import PastEvents from "./PastEvents";
import UpcomingEvents from "./UpcomingEvents";
import classes from './TourEvents.module.css'

function TourEvents(props) {
    const { location, fetchUserTourEvents, loading, tours } = props;
    const tabParam = queryString.parse(location.search).tab;

    useEffect(() => {
        fetchUserTourEvents();

    }, [fetchUserTourEvents])

    return (
        <section className="row">
            <div className={classes.TourEvents}>
                <h1 className={classes.TourEvents__name}>Tours</h1>
                    <Tabs defaultTab={tabParam}>
                        <Tab label={'upcoming'} tabName={'Upcoming'}>
                            {loading && !tours.length ? <TopLoading /> : <UpcomingEvents tours={tours.slice(0,2)} />}
                        </Tab>
                        <Tab label={'past'} tabName={'Past'}>
                            {!loading && tours.length ? <PastEvents tours={tours.slice(2)} /> : null}
                        </Tab>
                    </Tabs>
            </div>
        </section>
    )
}

const mapStateToProps = state => ({
    loading: state.user.me.tourEvents.loading,
    tours: state.user.me.tourEvents.data
})

const mapDispatchToProps = dispatch => ({
    fetchUserTourEvents: () => dispatch(fetchUserTourEvents())
})

export default connect(mapStateToProps, mapDispatchToProps)(TourEvents)