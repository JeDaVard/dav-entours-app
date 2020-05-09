import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
// import Topbar from '../components/Topbar/Topbar';
import Separator from '../components/UI/Separator/Separator';
// import Foot from '../components/Foot/Foot';
import TourHead from '../components/TourHead/TourHead';
import TourDescription from '../components/TourDescription/TourDescription';
import TourImages from '../components/TourImages/TourImages';
import PopDown from '../components/PopDown/PopDown';
// import Modal from '../components/UI/Modal/Modal';
// import LoginForm from './LoginForm/LoginForm';

function Tour(props) {
    const [showPopDown, setShowPopDown] = useState({
        prevScrollPos: window.pageYOffset,
        visible: false,
    });

    const handleScroll = () => {
        const { prevScrollPos } = showPopDown;

        const currentScrollPos = window.pageYOffset;
        const visible =
            prevScrollPos < currentScrollPos && currentScrollPos > 70;

        setShowPopDown((state) => ({
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

const mapStateToProps = state =>({
    isLogged: !!state.auth.token
})

export default connect(mapStateToProps)(Tour);
