import React from "react";
import queryString from 'query-string';
import { Query } from '@apollo/client/react/components'
import { FETCH_TOUR_EVENTS } from "./queries";
import { Tabs, Tab} from "../../components/UI/Tabs/Tabs";
import TopLoading from "../../components/UI/TopLoading/TopLoading";
import PastEvents from "./PastEvents";
import UpcomingEvents from "./UpcomingEvents";
import classes from './TourEvents.module.css'

function TourEvents(props) {
    const { location } = props;
    const tabParam = queryString.parse(location.search).tab;

    return (
        <section className="row">
            <div className={classes.TourEvents}>
                <h1 className={classes.name}>Tours</h1>
                    <Tabs defaultTab={tabParam}>
                        <Tab label={'upcoming'} tabName={'Upcoming'}>
                            <Query query={FETCH_TOUR_EVENTS}>
                                {
                                    ({loading, error, data}) => {
                                        if (loading) return <TopLoading />
                                        if (error) return <h1>Error while fetching upcoming tours</h1>
                                        return (
                                            <UpcomingEvents tours={data.tours.slice(1,3)} />
                                        )
                                    }
                                }
                            </Query>
                        </Tab>
                        <Tab label={'past'} tabName={'Past'}>
                            <Query query={FETCH_TOUR_EVENTS}>
                                {
                                    ({loading, error, data}) => {
                                        if (loading) return <TopLoading />
                                        if (error) return <h1>Error while fetching upcoming tours</h1>
                                        return (
                                            <PastEvents tours={data.tours.slice(3)} />
                                        )
                                    }
                                }
                            </Query>
                        </Tab>
                    </Tabs>
            </div>
        </section>
    )
}

export default TourEvents