import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchPopulars, fetchDiscovers, fetchTopUsers } from '../app/actions';
import Search from '../components/MainPage/Search/Search';
import Popular from '../components/MainPage/Popular/Popular';
import Become from '../components/MainPage/Become/Become';
import Discover from '../components/MainPage/Discover/Discover';
import Top from '../components/MainPage/Top/Top';
import TopSearchMobile from "../components/MainPage/TopSearchMobile/TopSearchMobile";

function Main(props) {
    const { fetchPopulars, fetchDiscovers, fetchTopUsers } = props;

    useEffect(() => {
        fetchPopulars();
        fetchDiscovers();
        fetchTopUsers();
    }, [fetchPopulars, fetchDiscovers, fetchTopUsers]);

    return (
        <>
            {props.isMobile ? <TopSearchMobile /> : <Search />}
            <Popular populars={props.populars} />
            <Become />
            <Discover discovers={props.discovers} />
            <Top users={props.users} />
        </>
    );
}

const mapStateToProps = (state) => ({
    populars: state.feed.populars,
    discovers: state.feed.discovers,
    users: state.user.users,
    isMobile: state.ui.display.isMobile,
});

export default connect(mapStateToProps, {
    fetchPopulars,
    fetchDiscovers,
    fetchTopUsers,
})(Main);
