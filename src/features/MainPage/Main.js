import React from 'react';
import { connect } from 'react-redux';
import Search from './Search/Search';
import Popular from './Popular/Popular';
import Become from './Become/Become';
import Discover from './Discover/Discover';
import Top from './Top/Top';
import TopSearchMobile from "../../components/TopSearchMobile/TopSearchMobile";
import ScrollToTop from "../../components/UI/ScrollToTop";


function Main(props) {
    return (
        <>
            <ScrollToTop />
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
