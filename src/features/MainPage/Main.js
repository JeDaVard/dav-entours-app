import React from 'react';
import { useSelector } from 'react-redux';
import Popular from './Popular/Popular';
import Become from './Become/Become';
import Discover from './Discover/Discover';
// import Top from './Top/Top';
import ScrollToTop from "../../components/UI/ScrollToTop";
import MainHead from "./MainHead/MainHead";


function Main() {
    const isMobile = useSelector(s => s.ui.display.isMobile);

    return (
        <>
            <ScrollToTop />
            <MainHead />
            <Popular />
            <Discover isMobile={isMobile}/>
            { isMobile && <Become/>}
            {/*<Top />*/}
        </>
    );
}

export default Main;
