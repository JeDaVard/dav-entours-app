import React from "react";
import Topbar from '../components/Topbar/Topbar'
import Search from "../components/Search/Search";
import Popular from "../components/Popular/Popular";
import Become from "../components/Become/Become";
import Random from "../components/Random/Random";
import Top from "../components/Top/Top";
import Foot from "../components/Foot/Foot";
import Separator from "../components/UI/Separator/Separator";

function Main() {
    return (
        <>
            <Topbar transparent={false}/>
            <Search />
            <Popular />
            <Become />
            <Random />
            <Top />
            <Separator />
            <Foot />
        </>
    )
}

export default Main