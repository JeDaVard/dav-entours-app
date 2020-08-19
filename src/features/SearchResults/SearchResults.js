import React from "react";
import MainHead from "../MainPage/MainHead/MainHead";
import classes from './SearchResults.module.css';
import { useQuery } from "@apollo/client";
import { FETCH_SEARCH_RESULTS } from "./queries";
import { useHistory } from "react-router-dom";
import qs from "query-string";
import Recommended from "../Search/Recommended";
import TourResult from "../Search/TourResult";
import {useSelector} from "react-redux";
import TourLocations from "../TourContainer/TourLocations/TourLocations";
import {Pagination} from "../../components/Pagination/Pagination";
import SearchLoading from "../Search/SearchLoading";
import ScrollToTop from "../../components/UI/ScrollToTop";

export default function SearchResults() {
    const history = useHistory();
    const { location } = history;
    const parsedData = qs.parse(location.search);
    const isMobile = useSelector(s => s.ui.display.isMobile)

    let participants = parsedData.participants ? +parsedData.participants.split(',')[0] : null;
    participants = participants < 1 || participants > 25 ? null : participants
    let maxGroupSize = parsedData.participants ? +parsedData.participants.split(',')[1] : null;
    maxGroupSize = maxGroupSize < 1 || maxGroupSize > 25 ? null : maxGroupSize

    // useEffect(() => {
        // if (!participants || !maxGroupSize) {
        //     history.push('/')
        // }
        // console.log(participants, maxGroupSize)
    // })

    let { coordinates, dates } = parsedData

    const { loading, data, fetchMore } = useQuery(FETCH_SEARCH_RESULTS, {
        variables: {
            initInput: {
                coordinates,
                dates,
                maxGroupSize,
                participants,
                page: 1,
                limit: 8
            }
        },
        fetchPolicy: "network-only",
        nextFetchPolicy: "cache-first"
    });

    const search = data ? data.search : {};

    const paginate = (e, page) => {
        e.preventDefault();
        window.scrollTo(0, 0);

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
            <ScrollToTop />
            <MainHead location={parsedData.place} />
                <div className={classes.result}>
                    <div className={classes.tours}>
                        {!loading && data ? (
                            <TourResult tours={data.search.data}
                                        searchCountry={parsedData.place}
                                        searchLocation={parsedData.precise} />
                        ) : (
                            <SearchLoading isMobile={isMobile}/>
                        )}
                    </div>
                    <div className={classes.map}>
                        <div className={classes.mapFrame}>
                            {data && !!data.search.data.length && !isMobile && (
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
                {data && !!data.recommended.length && (
                    <Recommended tours={data.recommended.slice(0,4)}/>
                )}
            </div>
            <div className="row">
                <Pagination loading={loading}
                            hasPrevPage={search.hasPrevPage}
                            prevPage={search.prevPage}
                            page={search.page}
                            hasMore={search.hasMore}
                            nextPage={search.nextPage}
                            totalPages={search.totalPages}
                            paginate={paginate} />

                <div className={classes.info}>
                    <p>Prices are for a single person. Additional fees apply. Taxes may be added.</p>
                </div>
            </div>
        </div>
    )
}