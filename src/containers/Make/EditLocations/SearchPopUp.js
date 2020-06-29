import React from "react";
import { connect } from "react-redux";
import { newViewport } from "../../../app/actions";
import classes from "./SearchPopUp.module.css";
import Justicon from "../../../components/UI/Justicon";
import 'mapbox-gl/dist/mapbox-gl.css';
import FindInMap from "./FindInMap";

function SearchPopUp(props) {
    // const [ hideSuggestions, setHideSuggestions ] = useState(false);
    // const closeSuggestions = () => {
    //     setHideSuggestions(true)
    // }

    return (
        <>
            <div className={classes.searchPage}>
                <div className={classes.absoluteMap}>
                    <FindInMap closeSearch={props.closeSearch}/>
                </div>
                {/*<OutsideAlerter delegate={closeSuggestions}>*/}
                {props.suggestions.length ? (
                        <div className={classes.locDrop}>
                            <div className={classes.searchPlaceholder}/>
                            {props.suggestions.map(loc => {
                                return (
                                    <button
                                        key={loc.geometry.coordinates[0].toString()+loc.place_name.slice(0.10)}
                                        onClick={(e) => {
                                            props.newViewport({
                                                longitude: loc.geometry.coordinates[0],
                                                latitude: loc.geometry.coordinates[1],
                                                zoom: 4
                                            })
                                        }}
                                        className={classes.searchResultButton}
                                    >
                                        <div className={classes.pin}>
                                            <Justicon icon={'map-pin'} className={classes.pinIcon}/>
                                        </div>
                                        <p className={classes.locName}>
                                            {loc.place_name}
                                        </p>
                                    </button>
                                )
                            })}
                        </div>)
                    : null}
                {/*</OutsideAlerter>*/}
            </div>
        </>
    )
}

// const mSTP = s => ({
//
// })

const mDTP = d => ({
    newViewport: (vprt) => d(newViewport(vprt))
})

export default connect(null, mDTP)(SearchPopUp)