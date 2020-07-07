import React, {useEffect} from 'react';
import { useQuery } from 'react-apollo';
import {useDispatch, useSelector} from 'react-redux';
import { Redirect, useParams } from 'react-router-dom'
import { FETCH_TOUR } from "./queries";
import Separator from '../../components/UI/Separator/Separator';
import TourHead from './TourHead/TourHead';
import TourDescription from './TourDescription/TourDescription';
import TourImages from './TourImages/TourImages';
import TourLocations from "./TourLocations/TourLocations";
import TourReviews from "./TourReviews/TourReviews";
import TopLoading from "../../components/UI/TopLoading/TopLoading";
import ScrollToTop from "../../components/UI/ScrollToTop";
import TourHeadLoading from "./TourHead/TourHeadLoading";
import TourHeadLoadingMobile from "./TourHead/TourHeadLoadingMobile";
import * as actionsTypes from "../../app/actions/ui/types";
import TourOrder from "./TourOrder/TourOrder";


function TourPage() {
    const { slug } = useParams();

    const [isMobile, isLoading] = useSelector(s => [s.ui.display.isMobile, s.ui.loading])
    const loadingOff = useDispatch()

    const { loading, data, error, fetchMore } = useQuery(FETCH_TOUR, {
        variables: {
            id: slug,
            page: 1,
            limit: 4
        },
        notifyOnNetworkStatusChange: true,
    });

    useEffect(() => {
        loadingOff({type: actionsTypes.LOADING_OFF})
    }, [loadingOff, isLoading])

    if (loading && !data) return (
        <>
            <TopLoading />
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
            <TourOrder tour={data.tour} />
        </>
    );
}

export default TourPage
