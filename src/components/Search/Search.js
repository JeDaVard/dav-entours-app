import React from "react";
import classes from './Search.module.css';
import StyledButton from "../StyledButton/StyledButton";
import Separator from "../UI/Separator/Separator";

function Search() {
    return (
        <section className={classes.Search}>
            <div className="row">
                <div className={classes.Search__content}>
                    <form className={classes.Search__form}>
                        <div className={classes.Search__inputs}>
                            <div className={classes.Search__inputbox}>
                                <label htmlFor="location">
                                    <div>Location</div>
                                <input type="text" name="location" placeholder={'Where to find?'} />
                                </label>
                            </div>
                            <Separator vertical margin={'-.1 0'} color={'middle'} height={'4.4'}/>
                            <div className={classes.Search__input}>
                                <button>
                                    <div>Tour Start/End</div>
                                    <div>Add Dates</div>
                                </button>
                            </div>
                            <Separator vertical margin={'-.1 0'} color={'middle'} height={'4.4'}/>
                            <div className={classes.Search__input}>
                                <button>
                                    <div>Participants</div>
                                    <div>Add participants</div>
                                </button>
                            </div>
                        </div>
                        <div className={classes.Search__button}>
                            <StyledButton>Search</StyledButton>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Search