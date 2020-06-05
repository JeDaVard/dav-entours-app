import React  from 'react';
import { connect } from 'react-redux';
import Search from '../components/MainPage/Search/Search';
import Popular from '../components/MainPage/Popular/Popular';
import Become from '../components/MainPage/Become/Become';
import Discover from '../components/MainPage/Discover/Discover';
import Top from '../components/MainPage/Top/Top';
import TopSearchMobile from "../components/MainPage/TopSearchMobile/TopSearchMobile";


function Main(props) {
    return (
        <>
            {props.isMobile ? <TopSearchMobile /> : <Search />}
            <Popular />
            <Become />
            <Discover isMobile={props.isMobile}/>
            <Top />
        </>
    );
}

const mapStateToProps = (state) => ({
    isMobile: state.ui.display.isMobile,
});

export default connect(mapStateToProps)(Main);
