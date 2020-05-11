import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { checkAuth } from './app/actions';
import Main from './containers/Main';
import './App.css';
import TourPage from './components/TourPage/TourPage';
import UserPage from './components/UserPage/UserPage';
import LoginForm from './containers/LoginForm/LoginForm';
import Modal from './components/UI/Modal/Modal';
import Layout from './components/Layout/Layout';
import Topbar from './components/Topbar/Topbar';
import Search from './components/Search/Search';
import Separator from './components/UI/Separator/Separator';
import Foot from './components/Foot/Foot';

function App(props) {
    // console.log(props)
    const { checkAuth } = props;

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

    // if (props.match.path.match(/^tour\/:id.+?/)) {
    //     setUI({transparentTop: true})
    // } else {
    //     setUI({transparentTop: false})
    // }


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
                        {...props}
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
                <Switch>
                    <Route path="/user/:id" component={UserPage} />
                    <Route path="/tour/:slug" component={TourPage} />
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
    loggedIn: !!state.auth.token
});
export default connect(mapStateToProps, { checkAuth })(withRouter(App));
