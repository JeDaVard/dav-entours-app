import React, { useEffect, useState } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import {
    LazyBook, LazyTourPage, LazyUserPage, LazyMyTours, LazyMake,
    LazyInbox, LazyConversation, LazySaved, LazyTourEvents, LazySearchResults,
    LazyEditTour, LazyMobileTopSearch
} from './';
import { connect } from 'react-redux';
import { setDesktop, setMobile } from './actions';
import Main from '../features/MainPage/Main';
import Profile from '../features/Profile/Profile';
import LoginForm from '../features/LoginForm/LoginForm';
import Modal from '../components/UI/Modal/Modal';
import Layout from './Layout/Layout';
import Topbar from '../components/Topbar/Topbar';
import Separator from '../components/UI/Separator/Separator';
import Foot from '../components/Foot/Foot';
import Error from './Error/Error';
import MobileBar from '../components/MobileBar/MobileBar';
import debounce from '../utils/debounce';
import OnlyAuth from './OnlyAuth/OnlyAuth';
import { useQuery, gql } from "@apollo/client";
import NotFound from "./NotFound/NotFound";
import TopLoading from "../components/UI/TopLoading/TopLoading";
import Become from "../features/MainPage/Become/Become";
import MobileSearch from "../features/MobileSearch/MobileSearch";
import './App.css';


const LOGGED_IN = gql`
	query AuthData {
		loggedIn @client
		name @client
		photo @client
        userId @client
	}
`;


function App(props) {
    const { setDesktop, setMobile } = props;
    const { data } = useQuery(LOGGED_IN)
    const { loggedIn, name, photo } = data;

    const [error, setError] = useState(false);

    useEffect(() => {
        if (props.error) {
            setError(true);
        }
    }, [props.error]);

    const [auth, setAuth] = useState({
        modal: false,
        login: ['Login', false],
    });

    if (loggedIn && auth.modal) {
        setAuth((state) => ({
            ...state,
            modal: false,
        }));
    }

    useEffect(() => {
        const debouncedHandleResize = debounce(function handleResize() {
            if (window.innerWidth <= 743 && !props.isMobile) setMobile();
            if (window.innerWidth > 743 && props.isMobile) setDesktop();
        }, 100);

        window.addEventListener('resize', debouncedHandleResize);
        return () => {
            window.removeEventListener('resize', debouncedHandleResize);
        };
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
            login: ['Login', true],
        });
    };
    const signUpModalHandler = () => {
        setAuth({
            modal: true,
            login: ['Sign Up', false],
        });
    };

    // if (props.location.pathname.match(/^\/inbox\//)) {
    //    return <Route exact path="/inbox/:id" component={Conversation} />
    // }

    return (
        <>
            {props.error && (
                <Error
                    onClose={() => setError(false)}
                    show={error}
                >
                    {props.error}
                </Error>
            )}
            <Layout
                header={
                    props.isMobile ? (
                        <>
                            {(props.location.pathname.startsWith('/tours')
                                || props.location.pathname === '/') && (
                                    <LazyMobileTopSearch />
                            )}
                            <MobileBar photo={photo} />
                        </>
                    ) : (
                        <>
                            {!props.location.pathname.match(/^\/inbox\//) && (
                                <Topbar
                                    {...props}
                                    name={name}
                                    photo={photo}
                                    isLogged={loggedIn}
                                    loginModal={authModalClose}
                                    onSignUp={signUpModalHandler}
                                    onLogin={loginModalHandler}
                                />
                            )}
                        </>
                    )
                }
                footer={
                    props.isMobile ? (
                        !props.location.pathname.match(/^\/inbox\//) &&
                        <div className="mobileBottomPlaceholder" />
                    ) : (
                        <>
                        {!props.location.pathname.match(/^\/inbox\//) && (
                            <>
                                <Become />
                                <Separator margin={'4 0'} />
                                <Foot />
                            </>
                        )}
                        </>
                    )
                }
            >
                {props.asyncLoading && <TopLoading />}
                <Switch>
                    <Route exact path="/" component={Main} />
                    <Route path="/payments/book" component={LazyBook} />
                    <Route path="/tour/:slug/edit" component={LazyEditTour}/>
                    <Route path="/tours/search" component={LazySearchResults}/>
                    <Route path="/tours" render={_ =>
                        props.isMobile ? <MobileSearch /> : <Redirect to={'/'} />}/>
                    <Route path="/user/:id" component={LazyUserPage} />
                    <Route path="/make" component={LazyMake}/>
                    <Route path="/mytours" component={LazyMyTours}/>
                    <Route exact path="/tour/:slug" component={LazyTourPage}/>
                    <Route exact path="/inbox/:id" component={LazyConversation} />
                    <Route path="/inbox" render={_ =>
                        loggedIn ? (
                            <LazyInbox />
                        ) : (
                            <OnlyAuth
                                signUp={signUpModalHandler}
                                login={loginModalHandler}
                            />
                        )
                    } />
                    <Route path="/saved" component={LazySaved} />
                    <Route
                        path="/tourevents"
                        render={props =>
                            loggedIn ? (
                                <LazyTourEvents { ...props } />
                            ) : (
                                <OnlyAuth
                                    signUp={signUpModalHandler}
                                    login={loginModalHandler}
                                />
                            )
                        }
                    />
                    <Route
                        path="/me"
                        render={(props) =>
                            loggedIn ? (
                                <Profile
                                    {...props}
                                    {...data}
                                    signUp={signUpModalHandler}
                                    closeSignUp={authModalClose}
                                />
                            ) : (
                                <OnlyAuth
                                    signUp={signUpModalHandler}
                                    login={loginModalHandler}
                                />
                            )
                        }
                    />
                    <Route path="/oops-not-found" component={NotFound} />
                    <Route path="*" component={NotFound} />
                </Switch>
                <Modal
                    onClick={authModalClose}
                    showBackdrop={auth.modal}
                    title={auth.login[0]}
                >
                    <LoginForm
                        login={auth.login[1]}
                        onSignUp={signUpModalHandler}
                        onLogin={loginModalHandler}
                    />
                </Modal>
            </Layout>
        </>
    );
}

const mapStateToProps = (state) => ({
    isMobile: state.ui.display.isMobile,
    asyncLoading: state.ui.loading
});
export default connect(mapStateToProps, { setDesktop, setMobile })(
    withRouter(App)
);
