import React, {useCallback, useEffect, useState} from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import {
    LazyBook, LazyTourPage, LazyUserPage, LazyMyTours, LazyMake,
    LazyInbox, LazyConversation, LazySaved, LazyTourEvents, LazySearchResults,
    LazyEditTour, LazyMobileTopSearch
} from './';
import {connect, useDispatch} from 'react-redux';
import {DISMISS_ERROR, FINISH_PROFILE_PHOTO} from "./actions/ui/types";
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
import ProfilePhoto from "../features/Profile/ProfilePhoto";

// import { gql, useQuery } from '@apollo/client'

function TestUsers() {
    const { loading, data, error } = useQuery(gql`
        query {
            users {
                _id
                name
                photo
            }
        }
    `)
    console.log(data)
    return (
        <div className="row">
            <h1>Users</h1>
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                {!loading && data.users.map((user, index) => (
                    <div key={user._id}
                        style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <img style={{width: '64px',height: '64px', borderRadius: '50%'}}
                             src={process.env.REACT_APP_CDN+'/'+user.photo}
                             alt={user.name}/>
                        <p><b>{index + 1}.</b> {user.name}</p>
                    </div>
                ))}
            </div>
            {!data && <h2>No data</h2>}
        </div>
    )
}


const LOGGED_IN = gql`
	query AuthData {
		loggedIn @client
		name @client
		photo @client
        userId @client
	}
`;


function App(props) {
    const { setDesktop, setMobile, profilePhoto } = props;
    const { data } = useQuery(LOGGED_IN)
    const { loggedIn, name, photo } = data;

    const dispatch = useDispatch();

    const dismissError = useCallback(() => {
        dispatch({type: DISMISS_ERROR})
    }, [])

    useEffect(() => {
        if (props.error) {
            dismissError();
        }
    }, [props.error, dismissError]);

    const [auth, setAuth] = useState({
        modal: false,
        login: false,
        signUp: false,
        title: ''
    });

    if (loggedIn && auth.modal) {
        setAuth((state) => ({
            ...state,
            modal: false,
            signUp: false,
            login: false,
            title: ''
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
        setAuth({
            ...auth,
            modal: false,
            login: false,
            signUp: false,
            title: ''
        });
    };

    const loginModalHandler = () => {
        setAuth({
            modal: true,
            signUp: false,
            login: true,
            title: 'Login'
        });
    };
    const signUpModalHandler = () => {
        setAuth({
            modal: true,
            login: false,
            signUp: true,
            title: 'Sign Up'
        });
    };

    // if (props.location.pathname.match(/^\/inbox\//)) {
    //    return <Route exact path="/inbox/:id" component={Conversation} />
    // }

    return (
        <>
            {props.error && (
                <Error
                    onClose={dismissError}
                    show={!!props.error}
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
                                <Separator margin={'4 5'} color={'light'} />
                                <Become />
                                <Separator height={'1'} margin={'5 0'} color={'light'} />
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
                    <Route path="/users" component={TestUsers} />
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
                    title={auth.title}
                >
                    <LoginForm
                        authModalClose={authModalClose}
                        login={auth.login}
                        signUp={auth.signUp}
                        onSignUp={signUpModalHandler}
                        onLogin={loginModalHandler}
                    />
                </Modal>
                <Modal
                    onClick={() => dispatch({type: FINISH_PROFILE_PHOTO})}
                    showBackdrop={profilePhoto}
                    title={'Profile'}
                >
                    <ProfilePhoto
                        name={localStorage.getItem('name')
                            ? localStorage.getItem('name').split(' ')[0]
                            : 'Photo'} />
                </Modal>
            </Layout>
        </>
    );
}

const mapStateToProps = (state) => ({
    isMobile: state.ui.display.isMobile,
    profilePhoto: state.ui.profilePhoto,
    error: state.ui.error,
    asyncLoading: state.ui.loading
});
export default connect(mapStateToProps, { setDesktop, setMobile })(
    withRouter(App)
);
