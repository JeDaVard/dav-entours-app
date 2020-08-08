import React, {useState} from "react";
import classes from './MobileTopSearch.module.css';
import Justicon from "../../components/UI/JustIcon/Justicon";

export default function MobileTopSearch() {
    const [ state, setState ] = useState({
        locations: [],
        location: '',
    })

    const focusHandler = () => {

    }

    const changeHandler = () => {

    }

    const searchHandler = (e, loc) => {

    }

    return (
        <div className={classes.mobileTopSearch}>
            <div className={classes.search}>
                <form
                    className={classes.form}
                    onSubmit={e => searchHandler(e, state.locations[0].geometry.coordinates)}>
                    <label className={classes.label}>
                        <button className={classes.button} type='submit'>
                            <Justicon icon='search' className={classes.icon}/>
                        </button>
                        <input
                            type="text"
                            className={classes.input}
                            onFocus={focusHandler}
                            onChange={changeHandler}
                            placeholder="Where are your going?"
                            autoComplete="off"/>
                    </label>
                </form>
            </div>
            <div className={classes.suggestions}>

            </div>
        </div>
    )
}