import React from "react";
import classes from './Search.module.css';
import StyledButton from "../StyledButton/StyledButton";
import Separator from "../UI/Separator/Separator";

function Search() {
    return (
        <section className={classes.Search}>
            <div className="row">
                <div>
                    <form action="">
                        <div className={classes.Search__form}>
                            <div className={classes.Search__search}>
                                <div className={classes.Search__cell}>
                                    <div>
                                        <div className={classes.Search__q}>
                                            <label htmlFor="search" className={classes.Search__loc}>
                                                <div className={classes.Search__loc__name}>Location</div>
                                                <input type="text" className={classes.Search__loc__input}
                                                       placeholder="Where to find?" id="search" />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className={classes.Search__sep}> </div>
                                <div className={classes.Search__cell}>
                                    <div className={classes.Search__q}>
                                        <button className={classes.Search__buttonBox}>
                                            <div className={classes.Search__buttonBox__title}>Tour start / end</div>
                                            <div className={classes.Search__buttonBox__selection}>Add dates</div>
                                        </button>
                                    </div>
                                </div>
                                <div className={classes.Search__sep}> </div>
                                <div className={classes.Search__cell}>
                                    <div className={classes.Search__q}>
                                        <button className={classes.Search__buttonBox}>
                                            <div className={classes.Search__buttonBox__title}>Tour start / end</div>
                                            <div className={classes.Search__buttonBox__selection}>Add dates</div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.Search__but}>
                                <StyledButton>Search</StyledButton>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Search