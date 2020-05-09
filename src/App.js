import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {checkAuth, fetchPopulars, fetchRandoms} from './app/actions';
import Main from './containers/Main';
import './App.css';
import Tour from './containers/Tour';
import LoginForm from './containers/LoginForm/LoginForm';
import Modal from './components/UI/Modal/Modal';
import Layout from './components/Layout/Layout';
import Topbar from './components/Topbar/Topbar';
import Search from './components/Search/Search';
import Top from './components/Top/Top';
import Separator from './components/UI/Separator/Separator';
import Foot from './components/Foot/Foot';

function App(props) {
    // console.log(props)
    const { checkAuth, fetchPopulars, fetchRandoms } = props;

    const [auth, setAuth] = useState({
        modal: false,
        login: ['Login', false],
    });

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    useEffect(() => {
        fetchPopulars();
        fetchRandoms();
    }, [fetchPopulars, fetchRandoms])

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


    let routes = (
        <>
        {/*// <Switch>*/}
        {/*//     <Route*/}
        {/*//         path="/"*/}
        {/*//         exact*/}
        {/*//         render={props => (*/}
        {/*//             <FeedPage userId={this.state.userId} token={this.state.token} />*/}
        {/*//         )}*/}
        {/*//     />*/}
        {/*//     <Route*/}
        {/*//         path="/:postId"*/}
        {/*//         render={props => (*/}
        {/*//             <SinglePostPage*/}
        {/*//                 {...props}*/}
        {/*//                 userId={this.state.userId}*/}
        {/*//                 token={this.state.token}*/}
        {/*//             />*/}
        {/*//         )}*/}
        {/*//     />*/}
        {/*// </Switch>*/}
        </>
    )

    return (
        <>
            <Layout
                header={
                    <Topbar
                        transparent={false}
                        isLogged={props.loggedIn}
                        loginModal={authModalClose}
                        onSignUp={signUpModalHandler}
                        onLogin={loginModalHandler}
                    />
                }
                footer={
                    <>
                        <Separator />
                        <Foot />
                    </>
                }>
                {/*<Main populars={props.populars} randoms={props.randoms}/>*/}
                <Tour />
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
    populars: state.feed.populars,
    randoms: state.feed.randoms
})


const mapDispatchToProps = (dispatch) => ({
    checkAuth: () => dispatch(checkAuth()),
    fetchPopulars: () => dispatch(fetchPopulars()),
    fetchRandoms: () => dispatch(fetchRandoms())
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
