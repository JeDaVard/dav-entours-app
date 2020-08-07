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
import TourLocations from "../TourContainer/TourLocations/TourLocations";

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

    const { loading, error, data, refetch, fetchMore } = useQuery(FETCH_SEARCH_RESULTS, {
        variables: {
            initInput: {
                coordinates,
                dates,
                maxGroupSize,
                participants,
                page: 1,
                limit: 8
            }
        }
    });

    useEffect(() => {
        if (location.state.fromSearch) {
            refetch()
        }
    }, [location.search])

    const search = !loading && data ? data.search : {};

    const paginate = (e, page) => {
        e.preventDefault();

        fetchMore({
            notifyOnNetworkStatusChange: true,
            variables: {
                initInput: {
                    coordinates,
                    dates,
                    maxGroupSize,
                    participants,
                    page,
                    limit: 8
                }
            },
        })
    }

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
                        <div className={classes.mapFrame}>
                            {!loading && !isMobile && (
                                <TourLocations
                                    search
                                    data={{
                                        start: data.search.data[0].startLocation,
                                        // locations: data.search.data.reduce((c, v) => c.concat(v.locations), [])
                                        locations: data.search.data.map(t => t.startLocation)
                                    }} />
                            )}
                        </div>
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
                    {search.hasPrevPage && (
                        <button className={classes.nextButton}
                                onClick={e => paginate(e, search.prevPage)}
                                disabled={loading}>
                            <Justicon icon={'chevron-left'} className={classes.nextIcon}/>
                        </button>
                    )}
                    {search.page > 3 && (
                        <>
                            <button className={classes.page}
                                    onClick={e => paginate(e, 1)}
                                    disabled={loading}>
                                1
                            </button>
                            <div>
                                <h2>...</h2>
                            </div>
                        </>
                    )}
                    {search.page - 2 > 1 && (
                        <button className={classes.page}
                                onClick={e => paginate(e, search.page - 1)}
                                disabled={loading}>
                            {search.page - 1}
                        </button>
                    )}
                    <button className={classes.pageActive} disabled={true}>{search.page}</button>
                    {search.page + 2 < search.totalPages && (
                        <button className={classes.page}
                                onClick={e => paginate(e, search.page + 1)}
                                disabled={loading}>
                            {search.page + 1}
                        </button>
                    )}
                    {search.hasMore && search.totalPages - 1 > search.page && (
                        <>
                            <div>
                                <h2>...</h2>
                            </div>
                            <button className={classes.page}
                                    onClick={e => paginate(e, search.totalPages)}
                                    disabled={loading}>
                                {search.totalPages}
                            </button>
                        </>
                    )}
                    {search.hasMore && (
                        <button className={classes.nextButton}
                                onClick={e => paginate(e, search.nextPage)}
                                disabled={loading}>
                            <Justicon icon={'chevron-right'} className={classes.nextIcon}/>
                        </button>
                    )}
                </div>
                <div className={classes.info}>
                    <p>Prices are for a single person. Additional fees apply. Taxes may be added.</p>
                </div>
            </div>
        </div>
    )
}