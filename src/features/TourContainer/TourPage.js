import React, {useEffect} from 'react';
import {useLazyQuery, useQuery} from '@apollo/client';
import { useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom'
import { FETCH_TOUR } from "./queries";
import Separator from '../../components/UI/Separator/Separator';
import TourHead from './TourHead/TourHead';
import TourDescription from './TourDescription/TourDescription';
import TourImages from './TourImages/TourImages';
import TourLocations from "./TourLocations/TourLocations";
import TourReviews from "./TourReviews/TourReviews";
import ScrollToTop from "../../components/UI/ScrollToTop";
import TourHeadLoading from "./TourHead/TourHeadLoading";
import TourHeadLoadingMobile from "./TourHead/TourHeadLoadingMobile";
import TourOrder from "./TourOrder/TourOrder";
import Recommended from "../Search/Recommended";
import {FETCH_RECOMMENDED} from "../SearchResults/queries";


function TourPage() {
    const { slug } = useParams();

    const isMobile = useSelector(s => s.ui.display.isMobile)

    const { loading, data, error, fetchMore } = useQuery(FETCH_TOUR, {
        variables: {
            id: slug,
            page: 1,
            limit: 4
        }
    });

    const [fetchRecommended, recommended] = useLazyQuery(FETCH_RECOMMENDED, {
        fetchPolicy: "network-only"
    });

    useEffect(() => {
        fetchRecommended();
        console.log(slug)
    }, [slug, fetchRecommended])

    if (loading && !data) return (
        <>
            {isMobile ? <TourHeadLoadingMobile /> : <TourHeadLoading />}
        </>
    )
    if (error) return <h1>Error while fetching the tour</h1>
    if (!data.tour) return <Redirect to={'/oops-not-found'}/>

    return (
        <>
            <ScrollToTop />
            <TourHead tour={data.tour} />
            <TourDescription tour={data.tour}/>
            <Separator />
            <TourImages images={data.tour.images}/>
            <TourLocations data={{start: data.tour.startLocation, locations: data.tour.locations}}/>
            <Separator margin={'0 2'} />
            <TourReviews tour={data.tour} more={fetchMore} loading={loading}/>
            <Separator margin={'3 4'} />
            {!recommended.loading
                && recommended.data
                && <Recommended tours={recommended.data.recommended.slice(0,4)}/>}
            <TourOrder tour={data.tour} />
        </>
    );
}

export default TourPage
