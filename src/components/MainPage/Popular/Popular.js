import React from 'react';
import classes from './Popular.module.css';
import PopularItem from './PopularItem';
import PopularItemLoading from './PopularItemLoading';

function Popular(props) {
    return (
        <section className={classes.Popular}>
            <div className="row">
                <div className={classes.Popular__content}>
                    {!props.populars.loading && props.populars.data.length ? (
                        props.populars.data.map((popular) => <PopularItem popular={popular} key={popular._id}/>)
                    ) : (
                        <>
                            <PopularItemLoading />
                            <PopularItemLoading />
                            <PopularItemLoading />
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Popular;
