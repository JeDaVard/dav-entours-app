import React, {useRef, useState} from "react";
import {connect} from "react-redux";
import { startSearchLoc, endSearchLoc } from '../../../app/actions/'
import classes from './SearchLocationInput.module.css';
import Justicon from "../../../components/UI/Justicon";
import SearchPopUp from "./SearchPopUp";


function SearchLocationInput(props) {
    const searchRef = useRef(null);

    const [ currentPosition, setCurrentPosition ] = useState({})
    const [ suggestions, setSuggestions ] = useState([]);

    const onCurrentPosition = (e, pos) => {
        setCurrentPosition(pos)
    }

    const changeHandler = async (e) => {
        const target = e.target
        try {
            if (target.value !== '') {
                const res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${target.value}.json?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}&limit=5`)
                const data = await res.json()
                setSuggestions(data.features)
            } else {
                setSuggestions([])
            }
        } catch (e) {
            console.log('error')
        }
    }

    const closeSearch = (e) => {
        e.preventDefault();

        props.endSearchLoc()
        setSuggestions([])
        searchRef.current.value = '';

    }

    return (
        <>
            { props.searching && (
                <>
                <SearchPopUp
                    closeSearch={closeSearch}
                    viewport={props.vprt}
                    suggestions={suggestions}
                    currentPosition={currentPosition}
                    onCurrentPosition={onCurrentPosition}/>

                <form className={classes.locForm}>
                    <div className={classes.inputBox}>
                        <input
                            ref={searchRef}
                            type="text"
                            placeholder="Search location"
                            onFocus={() => props.startSearchLoc()}
                            onChange={changeHandler}/>
                        <Justicon icon={'search'} className={classes.searchIcon}/>
                        {props.searching && (
                            <button onClick={closeSearch} className={classes.closeButton}>
                                <Justicon icon={'x'} className={classes.closeIcon}/>
                            </button>
                        )}
                    </div>
                </form>
                </>
            )}
        </>
    )
}


const mSTP = s => ({
    searching: s.searchLocation.searching,
    vprt: s.searchLocation.viewport
})

const mDTP = d => ({
    startSearchLoc: vprt => d(startSearchLoc(vprt)),
    endSearchLoc: () => d(endSearchLoc())
})

export default connect(mSTP, mDTP)(SearchLocationInput)