import React from "react";
import classes from './Search.module.css';
import StyledButton from "../../../components/UI/StyledButton/StyledButton";
import sprite from '../../../assets/icons/sprite.svg'

function Search() {
    return (
        <section className={classes.Search}>
            <div className="row">
                <div>
                    <form action="">
                        <div className={classes.form}>
                            <div className={classes.search}>
                                <div className={classes.cell}>
                                    <div>
                                        <div className={classes.q}>
                                            <label htmlFor="search" className={classes.loc}>
                                                <div className={classes.loc__name}>Location</div>
                                                <input type="text" className={classes.loc__input}
                                                       placeholder="Where to find?" id="search" />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className={classes.sep}> </div>
                                <div className={classes.cell}>
                                    <div className={classes.q}>
                                        <button className={classes.buttonBox}>
                                            <div className={classes.buttonBox__title}>Tour start / end</div>
                                            <div className={classes.buttonBox__selection}>Add dates</div>
                                        </button>
                                    </div>
                                </div>
                                <div className={classes.sep}> </div>
                                <div className={classes.cell}>
                                    <div className={classes.q}>
                                        <button className={classes.buttonBox}>
                                            <div className={classes.buttonBox__title}>Participants</div>
                                            <div className={classes.buttonBox__selection}>Add participants</div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.but}>
                                <StyledButton>
                                    <svg>
                                        <use href={sprite + '#icon-search'} />
                                    </svg>
                                    <span>Search</span>
                                </StyledButton>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Search