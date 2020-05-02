import React from "react";
import classes from './Search.module.css';

function Search() {
    return (
        <section className={classes.Search}>
            <div className="row">
                <div className={classes.Search__content}>
                    <form className={classes.Search__form}>
                        <input type="text" placeholder={'Location'}/>
                        <input type="date" placeholder={''}/>
                        <input type="text" placeholder={'How many person'}/>
                        <button>Search</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Search