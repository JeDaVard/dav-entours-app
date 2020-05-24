import React, { useEffect, useState } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { checkAuth, setDesktop, setMobile } from './app/actions';
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
import Error from "./components/Error/Error";
import MobileBar from "./components/MobileBar/MobileBar";
import debounce from "./utils/debounce";
import Saved from "./containers/Saved/Saved";
import TourEvents from "./containers/TourEvents/TourEvents";
import './App.css';
import OnlyAuth from "./OnlyAuth/OnlyAuth";


function App(props) {
    // console.log(props.loggedIn)
    const { checkAuth, setDesktop, setMobile, loggedIn } = props;

    const [ error, setError ] = useState(false)

    useEffect(() => {
        if (props.error) {
            setError(true)
        }
    }, [props.error])

    const [auth, setAuth] = useState({
        modal: false,
        login: ['Login', false],
    });

    if (props.loggedIn && auth.modal) {
        setAuth(state => ({
            ...state,
                modal: false
        }))
    }

    useEffect(() => {
        const debouncedHandleResize = debounce(function handleResize() {
            if (window.innerWidth <= 743 && !props.isMobile) {
                setMobile()
            } else if (window.innerWidth > 743 && props.isMobile) {
                setDesktop()
            }
        },300)

        window.addEventListener('resize', debouncedHandleResize)
        return () => {
            window.removeEventListener('resize', debouncedHandleResize)
        }
    })

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

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

    return (
        <>
            {props.error && <Error onClose={() => {setError(false)}} show={error}>{props.error}</Error>}
            <Layout
                header={
                    props.isMobile
                        ? <MobileBar
                            name={props.name}
                            photo={props.photo}
                        />
                        : <Topbar
                                {...props}
                                name={props.name}
                                photo={props.photo}
                                isLogged={props.loggedIn}
                                loginModal={authModalClose}
                                onSignUp={signUpModalHandler}
                                onLogin={loginModalHandler}
                            />
                }
                footer={
                    props.isMobile
                        ? <div style={{height: '6.5rem', width: '100%', }}> </div>
                        : <>
                            <Separator margin={'4 0'}/>
                            <Foot />
                        </>
                }>

                <Switch>
                    <Route path="/user/:id" component={UserPage} />
                    <Route path="/tour/:slug" component={TourPage} />
                    <Route path="/saved" component={Saved} />
                    <Route path="/tourevents" component={TourEvents} />
                    <Route path="/me" render={props => loggedIn ? (
                        <Profile
                            {...props}
                            signUp={signUpModalHandler}
                            closeSignUp={authModalClose}
                        />
                    ) : (
                        <div>
                            <OnlyAuth />
                        </div>
                    )} />
                    <Route path="/" component={Main} />
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

const mapStateToProps = state => ({
    loggedIn: !!state.auth.token,
    error: state.user.error || state.feed.error,
    loading: state.user.user.loading,
    isMobile: state.ui.display.isMobile,
    photo: `${process.env.REACT_APP_SERVER}/images/user/${state.auth.photo}`,
    name: state.auth.name.split(' ')[0]
});
export default connect(mapStateToProps, { checkAuth, setDesktop, setMobile })(withRouter(App));
