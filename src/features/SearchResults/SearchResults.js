import React, {useEffect} from "react";
import MainHead from "../MainPage/MainHead/MainHead";
import classes from './SearchResults.module.css';
import { useQuery } from "@apollo/client";
import { FETCH_SEARCH_RESULTS } from "./queries";
import { useHistory } from "react-router-dom";
import qs from "query-string";
import Recommended from "../Search/Recommended";

export default function SearchResults() {
    const history = useHistory();
    const { location } = history;
    const parsedData = qs.parse(location.search);

    let participants = parsedData.participants ? +parsedData.participants.split(',')[0] : null;
    participants = participants < 1 || participants > 25 ? null : participants
    let maxGroupSize = parsedData.participants ? +parsedData.participants.split(',')[1] : null;
    maxGroupSize = maxGroupSize < 1 || maxGroupSize > 25 ? null : maxGroupSize

    useEffect(() => {
        // if (!participants || !maxGroupSize) {
        //     history.push('/')
        // }
        console.log(participants, maxGroupSize)
    })

    let { coordinates, dates } = parsedData

    console.log(parsedData)

    const { loading, error, data } = useQuery(FETCH_SEARCH_RESULTS, {
        variables: {
            initInput: {
                coordinates,
                dates,
                maxGroupSize,
                participants
            }
        }
    })
    console.log(data, error, loading)
    return (
        <div>
            <MainHead location={parsedData.place} />
            <div className="row">
                <h1>as</h1>
                <div className={classes.result}>

                </div>
                <div className={classes.paginate}>

                </div>
                <div className={classes.recommended}>
                    <div className={classes.title}>
                        <h1>Recommended places to visit</h1>
                        <h4>Explore some of the best places to visit in the world</h4>
                    </div>
                    {!loading && (
                        <Recommended tours={data.recommended}/>
                    )}
                </div>
            </div>
        </div>
    )
}