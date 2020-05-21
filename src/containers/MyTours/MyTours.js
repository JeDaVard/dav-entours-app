import React from "react";
import queryString from 'query-string';
// import { connect } from 'react-redux';
import classes from './MyTours.module.css'
// import Separator from "../../components/UI/Separator/Separator";
// import TopLoading from "../../components/UI/TopLoading/TopLoading";
// import {Link} from "react-router-dom";
// import moment from "moment";
// import Justicon from "../../components/UI/Justicon";
import { Tabs, Tab} from "./Tabs";

function MyTours(props) {
    const tabParam = queryString.parse(props.location.search).tab;

    return (
        <section className="row">
            <div className={classes.MyTours}>
                <h1 className={classes.MyTours__name}>Tours</h1>
                    <Tabs defaultTab={tabParam}>
                        <Tab label={'upcoming'} tabName={'Upcoming'}>
                            First content
                        </Tab>
                        <Tab label={'past'} tabName={'Past'}>
                            Second content
                        </Tab>
                    </Tabs>
            </div>
        </section>
    )
}

export default MyTours