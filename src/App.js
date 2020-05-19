import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { checkAuth, setDesktop, setMobile } from './app/actions';
import Main from './containers/Main';
import './App.css';
import TourPage from './containers/TourContainer/TourPage';
import UserPage from './containers/UserContainer/UserPage';
import LoginForm from './containers/LoginForm/LoginForm';
import Modal from './components/UI/Modal/Modal';
import Layout from './components/Layout/Layout';
import Topbar from './components/Topbar/Topbar';
import Search from './components/MainPage/Search/Search';
import Separator from './components/UI/Separator/Separator';
import Foot from './components/Foot/Foot';
import Error from "./components/Error/Error";
import MobileBar from "./components/MobileBar/MobileBar";
import debounce from "./utils/debounce";

function App(props) {
    console.log(props)
    const { checkAuth, setDesktop, setMobile } = props;

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
            console.log(window.innerWidth)
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
                    <Route path="/me" render={props => <UserPage
                        {...props}
                        signUp={signUpModalHandler}
                        closeSignUp={authModalClose}
                    />} />
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
