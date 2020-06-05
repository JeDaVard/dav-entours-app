import React from 'react';
import { Query } from 'react-apollo';
import { FETCH_POPULAR } from "./queries";
import classes from './Popular.module.css';
import PopularItem from './PopularItem';
import PopularItemLoading from './PopularItemLoading';
import Error from "../../Error/Error";

function Popular() {

    return (
        <section className={classes.Popular}>
            <div className="row">
                <div className={classes.Popular__content}>
                    <Query query={FETCH_POPULAR}>
                        {
                            ({ loading, error, data }) => {
                                if (loading) return (
                                    <>
                                        <PopularItemLoading />
                                        <PopularItemLoading />
                                        <PopularItemLoading />
                                    </>
                                )
                                if (error) return <h1>Error while fetching popular items</h1>
                                return (
                                        <>
                                            {data.tours.map( tour => (
                                                <PopularItem popular={tour} key={tour._id}/>
                                            ))}
                                        </>
                                    )
                            }
                        }
                    </Query>
                </div>
            </div>
        </section>
    );
}

export default Popular;
