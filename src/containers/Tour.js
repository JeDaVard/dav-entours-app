import React, { useState, useEffect } from 'react';
import Topbar from '../components/Topbar/Topbar';
import Separator from '../components/UI/Separator/Separator';
import Foot from '../components/Foot/Foot';
import TourHead from '../components/TourHead/TourHead';
import TourDescription from '../components/TourDescription/TourDescription';
import TourImages from '../components/TourImages/TourImages';
import PopDown from '../components/PopDown/PopDown';
import Modal from '../components/UI/Modal/Modal';
import LoginForm from '../components/LoginForm/LoginForm';

function Tour() {
    const [showPopDown, setShowPopDown] = useState({
        prevScrollPos: window.pageYOffset,
        visible: false,
    });
    const [auth, setAuth] = useState({
        modal: false,
        login: false,
    });

    const authModalClose = () => {
        setAuth((state) => ({
            ...state,
            modal: false,
        }));
    };
    const loginModalHandler = () => {
        setAuth({
            modal: true,
            login: true,
        });
    };
    const signUpModalHandler = () => {
        setAuth({
            modal: true,
            login: false,
        });
    };

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
            <Topbar
                transparent={true}
                isLogged={false}
                loginModal={authModalClose}
                onSignUp={signUpModalHandler}
                onLogin={loginModalHandler}
            />
            <Modal
                onClick={authModalClose}
                showBackdrop={auth.modal}
                title={'Authentication'}
            >
                <LoginForm
                    login={auth.login}
                    onSignUp={signUpModalHandler}
                    onLogin={loginModalHandler}
                />
            </Modal>
            <TourHead />
            <TourDescription />
            <Separator />
            <TourImages />
            <Separator />
            <Foot />
            <PopDown show={showPopDown.visible} />
        </>
    );
}

export default Tour;
