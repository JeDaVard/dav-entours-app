import React from "react";
import classes from './Search.module.css';

function Search() {
    return (
        <section className={classes.Search}>
            <input type="text"/>
            <input type="date"/>
            <input type="text"/>
            <button>Search</button>
        </section>
    )
}

export default Search