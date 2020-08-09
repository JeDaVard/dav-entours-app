import React, {useEffect, useState} from "react";
import { useHistory } from 'react-router-dom';
import classes from './MobileTopSearch.module.css';
import classNames from 'classnames/bind'
import Justicon from "../../components/UI/JustIcon/Justicon";
import Locations from "../Search/Locations";
import useScrollTrigger from "../../hooks/useScrollTrigger";
import queryString from "query-string";
import _ from 'lodash';

const cx = classNames.bind(classes)

export default function MobileTopSearch() {
    const history = useHistory();
    const initLocation = queryString.parse(history.location.search).precise;
    const localSearchHistory = localStorage.getItem('search_history')
    const locationHistory = JSON.parse(localSearchHistory) || []

    const [ state, setState ] = useState({
        locations: [],
        locationHistory: [],
        location: initLocation || '',
        searching: false,
    });

    useEffect(() => {
        if (locationHistory.length) {
            setState(p => ({...p, locationHistory}))
        }
    }, [localSearchHistory])

    useEffect(() => {
        if (initLocation) {
            setState(p => ({...p, location: initLocation}))
        } else {
            setState(p => ({...p, locations: [], location: ''}))
        }
    }, [initLocation])

    useEffect(() => {
        if (state.searching) {
            document.body.style.overflow = 'hidden'
        }
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [state.searching])

    const [trigger] = useScrollTrigger({changePoint: 0})

    const focusHandler = () => {
        setState(p => ({...p, searching: true}))
    }

    const closeHandler = (e) => {
        e.preventDefault()
            setState(p => ({...p, searching: false}))
    }

    const changeHandler = async e => {
        const target = e.target
        setState(p => ({...p, location: target.value}))
        try {
            if (target.value !== '') {
                const res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${target.value}.json?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}&limit=5`)
                const data = await res.json()
                setState(p => ({...p, locations: data.features}))
            } else {
                setState(p => ({...p, locations: []}))
            }
        } catch (e) {
            setState(p => ({...p, locations: []}))
            console.log('error')
        }
    }

    const searchHandler = (e, specificLoc) => {
        if (e) e.preventDefault();

        if (!specificLoc) {
            return;
        }

        const qLocName = specificLoc.place_name
            .split(',')
            .slice(-1)
            .toString()
            .trim();
        const qPreciseLoc = specificLoc.place_name
            .split(',')[0];
        const qCoordinates = specificLoc.geometry.coordinates.toString();

        // if (fromSearch) closeSearch(false);

        const localHistory = localStorage.getItem('search_history');
        const searchHistory = localHistory ? JSON.parse(localHistory) : [];
        searchHistory.unshift(specificLoc);
        localStorage.setItem('search_history', JSON.stringify(_
            .uniqBy(searchHistory,function(i){return i.geometry.coordinates.toString()})
            .slice(0,5)
        ))

        setState(p => ({...p, searching: false}))
        history.push(`/tours/search?place=${qLocName}&precise=${qPreciseLoc}&coordinates=${qCoordinates}&dates=0,0&participants=1,25`)
    }

    return (
        <div className={classes.mobileTopSearch}>
            <div className={state.searching ? classes.searching : cx(classes.searchTransparent, {search: trigger})}>
                <form
                    className={classes.form}
                    onSubmit={e => searchHandler(e, state.locations.length ? state.locations[0].geometry.coordinates : null)}>
                    <label htmlFor="searchInputMobile"
                           className={cx(classes.label, {labelActive: state.searching})}>
                        <button className={classes.button} type='submit'>
                            <Justicon icon='search' className={classes.icon}/>
                        </button>
                        <input
                            type="text"
                            id="searchInputMobile"
                            value={state.location}
                            className={classes.input}
                            onFocus={focusHandler}
                            onChange={changeHandler}
                            placeholder="Where are your going?"
                            autoComplete="off"/>
                        {state.location !== '' && (
                            <button className={classes.clear} onClick={e => {
                                e.preventDefault();
                                setState(p => ({...p, locations: [], location: ''}))
                            }}>
                                <Justicon icon={'x'} className={classes.clearIcon}/>
                            </button>
                        )}
                    </label>
                    {state.searching && (
                        <button onClick={closeHandler} className={classes.cancel}>
                            Cancel
                        </button>
                    )}
                </form>
            </div>
            {state.searching && (
                <div className={classes.suggestions}>
                    {!!state.locations.length && (
                        <Locations locations={state.locations}
                                   className={classes.locations}
                                   onSearch={searchHandler} />
                    )} {!state.locations.length && (
                    <Locations locations={state.locationHistory}
                               recent
                               className={classes.locations}
                               onSearch={searchHandler} />
                )}
                </div>
            )}
        </div>
    )
}