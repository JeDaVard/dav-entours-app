import React from 'react';
import { useQuery } from '@apollo/client';
import { FETCH_POPULAR } from "./queries";
import classes from './Popular.module.css';
import PopularItem from './PopularItem';
import PopularItemLoading from './PopularItemLoading';

function Popular() {
    const { loading, error, data } = useQuery(FETCH_POPULAR);
    let content;
    if (loading) content = (
        <>
            <PopularItemLoading />
            <PopularItemLoading />
            <PopularItemLoading />
            <PopularItemLoading />
        </>
    )
    if (error) content = (process.env.NODE_ENV === 'production' ? <h1>Error while fetching popular items</h1> : error.message)
    if (!loading && data) content = data.tours.map( tour => (
        <PopularItem popular={tour} key={tour._id} />))

    return (
        <section className={classes.Popular}>
            <div className="row">
                <div className={classes.content}>
                    {content}
                </div>
            </div>
        </section>
    );
}

export default Popular;
