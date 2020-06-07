import React from 'react';
import { Query } from 'react-apollo';
import { FETCH_TOP_USERS } from "./queries";
import { Link } from 'react-router-dom';
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
                    <Query query={FETCH_TOP_USERS}>
                        {
                            ({loading, error, data}) => {
                                if (loading) return (
                                    <>
                                        <TopItemLoading />
                                        <TopItemLoading />
                                        <TopItemLoading />
                                    </>
                                )
                                if (error) return <h1>{error.message}. While fetching top users</h1>
                                return (
                                    data.users.slice(data.users.length - 8, data.users.length).reverse().map( user => (
                                        <Link to={{pathname: `/user/${user._id}`}} key={user._id}>
                                            <TopItem user={user}/>
                                        </Link>
                                    ))
                                )
                            }
                        }
                    </Query>
                </div>

            </div>
        </section>
    );
}

export default Top;
