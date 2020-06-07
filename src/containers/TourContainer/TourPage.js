import React from 'react';
import { useQuery } from 'react-apollo';
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


function TourPage(props) {
    console.log(props)
    const { slug } = useParams();

    const { loading, data, error } = useQuery(FETCH_TOUR, {
        variables: {
            id: slug
        }
    });

    if (loading) return <TopLoading />
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


export default TourPage
