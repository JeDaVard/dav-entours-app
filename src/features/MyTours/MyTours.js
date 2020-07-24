import React from "react";
import { useLocation } from 'react-router-dom'
import { Query } from '@apollo/client/react/components'
import classes from './MyTours.module.css';
import Separator from "../../components/UI/Separator/Separator";
import {Tab, Tabs} from "../../components/UI/Tabs/Tabs";
import queryString from "query-string";
import MyToursItem from "./MyTourItem";
import {FETCH_MY_DRAFT_TOURS, FETCH_MY_GUIDE_TOURS, FETCH_MY_TOURS} from "./queries";
import TopLoading from "../../components/UI/TopLoading/TopLoading";

function MyTours() {
    const location = useLocation();
    const tabParam = queryString.parse(location.search).tab;

    return (
            <div className={classes.myTours}>
                <div className="row">
                    <h1 className={classes.title}>My Tours</h1>
                    <Separator margin={'0 2'} color={'normal'} />
                    <Tabs defaultTab={tabParam}>
                        <Tab label={'own'} tabName={'Own'}>
                            <Query query={FETCH_MY_TOURS}>
                                {({loading, error, data}) => {
                                    if (loading) return <TopLoading />
                                    if (error) return <h1>Error while fetching tours</h1>
                                    return (
                                        <>
                                            {data.me.tours.map(tour => (
                                                <MyToursItem key={tour._id} data={tour}/>
                                            ))}
                                        </>
                                    )
                                }}
                            </Query>
                        </Tab>
                        <Tab label={'guide'} tabName={'Guide'}>
                            <Query query={FETCH_MY_GUIDE_TOURS}>
                                {({loading, error, data}) => {
                                    if (loading) return <TopLoading />
                                    if (error) return <h1>Error while fetching tours</h1>
                                    return (
                                        <>
                                            {data.me.asGuide.map(tour => (
                                                <MyToursItem key={tour._id} data={tour}/>
                                            ))}
                                        </>
                                    )
                                }}
                            </Query>
                        </Tab>
                        <Tab label={'draft'} tabName={'Draft'}>
                            <Query query={FETCH_MY_DRAFT_TOURS}>
                                {({loading, error, data}) => {
                                    if (loading) return <TopLoading />
                                    if (error) return <h1>Error while fetching tours</h1>
                                    return (
                                        <>
                                            {data.me.draft.map(tour => (
                                                <MyToursItem key={tour._id} data={tour}/>
                                            ))}
                                        </>
                                    )
                                }}
                            </Query>
                        </Tab>
                    </Tabs>
                </div>
            </div>
    )
}

export default MyTours