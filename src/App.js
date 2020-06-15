import React, { useEffect, useState } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setDesktop, setMobile } from './app/actions';
import Main from './containers/Main';
import TourPage from './containers/TourContainer/TourPage';
import UserPage from './containers/UserContainer/UserPage';
import Profile from './containers/Profile/Profile';
import LoginForm from './containers/LoginForm/LoginForm';
import Modal from './components/UI/Modal/Modal';
import Layout from './components/Layout/Layout';
import Topbar from './components/Topbar/Topbar';
import Separator from './components/UI/Separator/Separator';
import Foot from './components/Foot/Foot';
import Error from './components/Error/Error';
import MobileBar from './components/MobileBar/MobileBar';
import debounce from './utils/debounce';
import Saved from './containers/Saved/Saved';
import TourEvents from './containers/TourEvents/TourEvents';
import './App.css';
import OnlyAuth from './components/OnlyAuth/OnlyAuth';
import Inbox from "./containers/Inbox/Inbox";
import Conversation from "./containers/Inbox/Conversation/Conversation";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import NotFound from "./components/NotFound/NotFound";
import TopLoading from "./components/UI/TopLoading/TopLoading";


const LOGGED_IN = gql`
	query IsUserLoggedIn {
		loggedIn @client
		name @client
		photo @client
        userId @client
	}
`;
// export const FETCH_TOUR = gql`
// 	query FetchTour($id: ID!) {
// 		tour(id: $id) {
// 			_id
// 			name
// 			imageCover
// 			slug
// 			duration
// 			createdAt
// 			price
// 			startDates
// 			description
// 			summary
// 			hashtags
// 			startDates
// 			difficulty
// 			images
// 			ratingsAverage
// 			ratingsQuantity
// 			participants {
// 				_id
// 			}
// 			startLocation {
// 				description
// 			}
// 			author {
// 				_id
// 				name
// 				photo
// 			}
// 			guides {
// 				_id
// 				name
// 				photo
// 			}
// 			reviews {
// 				review
// 				_id
// 				author {
// 					_id
// 					photo
// 					name
// 					createdAt
// 				}
// 			}
//
// 		}
// 	}
// `;

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
            if (window.innerWidth <= 743 && !props.isMobile) {
                setMobile();
            } else if (window.innerWidth > 743 && props.isMobile) {
                setDesktop();
            }
        }, 300);

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
                    onClose={() => {
                        setError(false);
                    }}
                    show={error}
                >
                    {props.error}
                </Error>
            )}
            <Layout
                header={
                    props.isMobile ? (
                        <MobileBar photo={photo} />
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
                        <div style={{ height: '6.5rem', width: '100%' }} />
                    ) : (
                        <>
                        {!props.location.pathname.match(/^\/inbox\//) && (
                            <>
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
                    <Route path="/" exact component={Main} />
                    <Route path="/user/:id" component={UserPage} />
                    <Route path="/tour/:slug" component={TourPage}/>
                    <Route exact path="/inbox/:id" component={Conversation} />
                    <Route path="/inbox" render={props =>
                        loggedIn ? (
                            <Inbox />
                        ) : (
                            <OnlyAuth
                                signUp={signUpModalHandler}
                                login={loginModalHandler}
                            />
                        )
                    } />
                    <Route path="/saved" component={Saved} />
                    <Route
                        path="/tourevents"
                        render={props =>
                            loggedIn ? (
                                <TourEvents { ...props } />
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
