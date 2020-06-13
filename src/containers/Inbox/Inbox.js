import React from "react";
import classes from './Inbox.module.css';
import Separator from "../../components/UI/Separator/Separator";
import InboxItem from "./InboxItem/InboxItem";


function Inbox() {
    return (
        <section className="row">
            <div className={classes.Inbox}>
                <h1 className={classes.Inbox__title}>Inbox</h1>
                <Separator margin={'0 1'} color={'normal'} />
                
                <InboxItem />

            </div>
        </section>
    )
}

export default Inbox