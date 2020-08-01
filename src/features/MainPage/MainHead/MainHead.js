import React from "react";
import classes from './MainHead.module.css';
import TopSearchMobile from "../../../components/TopSearchMobile/TopSearchMobile";
import Search from "../Search/Search";
import mainImg from '../../../assets/img/main.jpg'

export default function MainHead(props) {
    return (
        <div className={classes.MainHead}>
            <div>
                <img src={mainImg} className={classes.mainImg} alt="entours main"/>
            </div>
            <div className={classes.search}>
                {props.isMobile ? <TopSearchMobile /> : <Search />}
            </div>
        </div>
    )
}