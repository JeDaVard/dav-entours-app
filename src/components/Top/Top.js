import React from 'react';
// import { Link } from 'react-router-dom';
import TopItemLoading from './TopItemLoading';
import classes from './Top.module.css';
import TopItem from './TopItem';

function Top(props) {
    return (
        <section className={classes.Top}>
            <div className="row">
                <div className={classes.Top__title}>
                    <h3>Top tourmakers</h3>
                    <p>Monthly most active tourmaker</p>
                </div>

                <div className={classes.Top__content}>
                    {!props.loading && props.users.data.length ? (
                        props.users.data.map((user) => <TopItem user={user} key={user._id}/>)
                    ) : (
                        <>
                            <TopItemLoading />
                            <TopItemLoading />
                            <TopItemLoading />
                        </>
                    )}
                </div>

            </div>
        </section>
    );
}

export default Top;
