import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { checkAuth } from "./app/actions";
import Main from './containers/Main';
import './App.css';
import Tour from './containers/Tour';

function App(props) {
    const { checkAuth } = props;

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    return <Main />;
}

const mapDispatchToProps = dispatch => ({
  checkAuth: () => dispatch(checkAuth())
})

export default connect(null, mapDispatchToProps)(App);
