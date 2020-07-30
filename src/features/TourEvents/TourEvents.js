import React from "react";
import queryString from 'query-string';
import { Query } from '@apollo/client/react/components'
import { FETCH_CURRENT_ORDERS, FETCH_PAST_ORDERS } from "./queries";
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
                            <Query query={FETCH_CURRENT_ORDERS}>
                                {
                                    ({loading, error, data}) => {
                                        if (loading) return <TopLoading />
                                        if (error) return <h1>Error while fetching upcoming tours</h1>
                                        return (
                                            <UpcomingEvents orders={data.me.orders} />
                                        )
                                    }
                                }
                            </Query>
                        </Tab>
                        <Tab label={'past'} tabName={'Past'}>
                            <Query query={FETCH_PAST_ORDERS}>
                                {
                                    ({loading, error, data}) => {
                                        if (loading) return <TopLoading />
                                        if (error) return <h1>Error while fetching upcoming tours</h1>
                                        return (
                                            <PastEvents orders={data.me.pastOrders} />
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