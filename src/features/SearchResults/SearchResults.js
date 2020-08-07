import React, {useEffect} from "react";
import MainHead from "../MainPage/MainHead/MainHead";
import classes from './SearchResults.module.css';
import { useQuery } from "@apollo/client";
import { FETCH_SEARCH_RESULTS } from "./queries";
import { useHistory } from "react-router-dom";
import qs from "query-string";
import Recommended from "../Search/Recommended";
import Justicon from "../../components/UI/JustIcon/Justicon";
import TourResult from "../Search/TourResult";
import {useSelector} from "react-redux";

export default function SearchResults() {
    const history = useHistory();
    const { location } = history;
    const parsedData = qs.parse(location.search);
    const isMobile = useSelector(s => s.ui.display.isMobile)

    let participants = parsedData.participants ? +parsedData.participants.split(',')[0] : null;
    participants = participants < 1 || participants > 25 ? null : participants
    let maxGroupSize = parsedData.participants ? +parsedData.participants.split(',')[1] : null;
    maxGroupSize = maxGroupSize < 1 || maxGroupSize > 25 ? null : maxGroupSize

    useEffect(() => {
        // if (!participants || !maxGroupSize) {
        //     history.push('/')
        // }
        // console.log(participants, maxGroupSize)
    })

    let { coordinates, dates } = parsedData

    const { loading, error, data, refetch } = useQuery(FETCH_SEARCH_RESULTS, {
        variables: {
            initInput: {
                coordinates,
                dates,
                maxGroupSize,
                participants
            }
        },
    });

    useEffect(() => {
        if (location.state.fromSearch) {
            refetch()
        }
    }, [location.search])


    return (
        <div>
            <MainHead location={parsedData.place} />
                <div className={classes.result}>
                    <div className={classes.tours}>
                        {!loading && data && (
                            <TourResult tours={data.search.data}
                                        searchCountry={parsedData.place}
                                        searchLocation={parsedData.precise} />
                        )}
                    </div>
                    <div className={classes.map}>

                    </div>
                </div>
            <div className={classes.recommended}>
                <div className="row">
                    <div className={classes.title}>
                        <h1>Recommended places to visit</h1>
                        <h4>Explore some of the best places to visit in the world</h4>
                    </div>
                </div>
                {!loading && (
                    <Recommended tours={data.recommended.slice(0,4)}/>
                )}
            </div>
            <div className="row">
                <div className={classes.paginate}>
                    <button className={classes.nextButton}>
                        <Justicon icon={'chevron-left'} className={classes.nextIcon}/>
                    </button>
                    <button className={classes.page}>2</button>
                    <button className={classes.nextButton}>
                        <Justicon icon={'chevron-right'} className={classes.nextIcon}/>
                    </button>
                </div>
                <div className={classes.info}>
                    <p>Prices are for a single person. Additional fees apply. Taxes may be added.</p>
                </div>
            </div>
        </div>
    )
}