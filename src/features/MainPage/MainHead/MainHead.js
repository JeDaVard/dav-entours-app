import React from "react";
import classes from './MainHead.module.css';
import TopSearchMobile from "../../../components/TopSearchMobile/TopSearchMobile";
import Search from "../Search/Search";

export default function MainHead(props) {
    return (
        <div className={classes.MainHead}>
            <div>
                <img src="" alt=""/>
            </div>
            {props.isMobile ? <TopSearchMobile /> : <Search />}
        </div>
    )
}