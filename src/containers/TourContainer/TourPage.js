import React from 'react';
import { useQuery } from 'react-apollo';
import { connect } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom'
import { FETCH_TOUR } from "./queries";
import Separator from '../../components/UI/Separator/Separator';
import TourHead from '../../components/TourPage/TourHead/TourHead';
import TourDescription from '../../components/TourPage/TourDescription/TourDescription';
import TourImages from '../../components/TourPage/TourImages/TourImages';
import PopDown from '../../components/TourPage/PopDown/PopDown';
import TourReviews from "../../components/TourPage/TourReviews/TourReviews";
import TopLoading from "../../components/UI/TopLoading/TopLoading";
import ScrollToTop from "../../components/UI/ScrollToTop";
import TourHeadLoading from "../../components/TourPage/TourHead/TourHeadLoading";
import TourHeadLoadingMobile from "../../components/TourPage/TourHead/TourHeadLoadingMobile";


function TourPage(props) {
    const { slug } = useParams();

    const { loading, data, error } = useQuery(FETCH_TOUR, {
        variables: {
            id: slug
        }
    });
    // const loading = true;
    // const data  = []
    // const error = null

    if (loading) return (
        <>
            <TopLoading />
            {props.isMobile ? <TourHeadLoadingMobile /> : <TourHeadLoading />}
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
            <Separator margin={'0 2'}/>
            <TourReviews tour={data.tour} />
            <PopDown tour={data.tour}/>
        </>
    );
}

const mSTP = s => ({
    isMobile: s.ui.display.isMobile
})

export default connect(mSTP)(TourPage)
