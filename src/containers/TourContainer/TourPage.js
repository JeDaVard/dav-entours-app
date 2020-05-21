import React, {useState, useEffect, useCallback} from 'react';
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
    const existingToursState = props.location.state;
    const slug = props.match.params.slug;

    const [showPopDown, setShowPopDown] = useState({
        prevScrollPos: window.pageYOffset,
        visible: false,
    });

    useEffect(() => {
        fetchTour(slug, existingToursState);
    }, [fetchTour, existingToursState, slug]);

    const handleScroll = useCallback(() => {
        const { prevScrollPos } = showPopDown;

        const currentScrollPos = window.pageYOffset;
        const visible =
            prevScrollPos < currentScrollPos && currentScrollPos > 70;

        setShowPopDown((state) => ({
            ...state,
            prevScrollPos: currentScrollPos,
            visible,
        }));
    }, [showPopDown]);

    useEffect(() => {

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);
    return (
        <>
            {props.loading && <TopLoading />}
            <TourHead />
            <TourDescription />
            <Separator />
            <TourImages />
            <Separator margin={'0 2'}/>
            <TourReviews />
            <PopDown show={showPopDown.visible} />
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
