import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchTour } from '../../app/actions';
import Separator from '../../components/UI/Separator/Separator';
import TourHead from '../../components/TourPage/TourHead/TourHead';
import TourDescription from '../../components/TourPage/TourDescription/TourDescription';
import TourImages from '../../components/TourPage/TourImages/TourImages';
import PopDown from '../../components/TourPage/PopDown/PopDown';
import TourReviews from "../../components/TourPage/TourReviews/TourReviews";
import TopLoading from "../../components/UI/TopLoading/TopLoading";


function TourPage(props) {
    const { fetchTour } = props;
    const slug = props.match.params.slug;

    useEffect(() => {
        fetchTour(slug);
    }, [fetchTour, slug]);

    return (
        <>
            {props.loading && <TopLoading />}
            <TourHead />
            <TourDescription />
            <Separator />
            <TourImages />
            <Separator margin={'0 2'}/>
            <TourReviews />
            <PopDown />
        </>
    );
}

const mapStateToProps = state => ({
    loading: state.feed.tour.loading
})

const mapDispatchToProps = (dispatch) => ({
    fetchTour: (slug, readyTour) => dispatch(fetchTour(slug, readyTour)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TourPage);
