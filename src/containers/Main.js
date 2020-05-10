import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { fetchPopulars, fetchRandoms, fetchTopUsers } from '../app/actions';
import Search from "../components/Search/Search";
import Popular from "../components/Popular/Popular";
import Become from "../components/Become/Become";
import Random from "../components/Random/Random";
import Top from "../components/Top/Top";

function Main(props) {
    const { fetchPopulars, fetchRandoms, fetchTopUsers } = props;

    useEffect(() => {
        fetchPopulars();
        fetchRandoms();
        fetchTopUsers();
    }, [fetchPopulars, fetchRandoms, fetchTopUsers])

    return (
        <>
            <Search />
            <Popular populars={props.populars} />
            <Become />
            <Random randoms={props.randoms} />
            <Top users={props.users}/>
        </>
    )
}

const mapStateToProps = state => ({
    populars: state.feed.populars,
    randoms: state.feed.randoms,
    users: state.user.users
});

export default connect(mapStateToProps, { fetchPopulars, fetchRandoms, fetchTopUsers })(Main)