import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchTour } from "../../app/actions";
import Separator from '../UI/Separator/Separator';
import TourHead from './TourHead/TourHead';
import TourDescription from './TourDescription/TourDescription';
import TourImages from './TourImages/TourImages';
import PopDown from './PopDown/PopDown';

function TourPage(props) {
    const { fetchTour } = props;

    const [showPopDown, setShowPopDown] = useState({
        prevScrollPos: window.pageYOffset,
        visible: false,
    });

    useEffect(() => {
        fetchTour(props.match.params.slug)
    }, [fetchTour])

    const handleScroll = () => {
        const { prevScrollPos } = showPopDown;

        const currentScrollPos = window.pageYOffset;
        const visible =
            prevScrollPos < currentScrollPos && currentScrollPos > 70;

        setShowPopDown((state) => ({
            ...state,
            prevScrollPos: currentScrollPos,
            visible,
        }));
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);
    return (
        <>
            <TourHead />
            <TourDescription />
            <Separator />
            <TourImages />
            <PopDown show={showPopDown.visible} />
        </>
    );
}

const mapStateToProps = state => ({
    tour: state.feed.tour.data,
    loading: state.feed.tour.loading
});

const mapDispatchToProps = dispatch => ({
    fetchTour: slug => dispatch(fetchTour(slug))
})

export default connect(mapStateToProps, mapDispatchToProps )(TourPage);
