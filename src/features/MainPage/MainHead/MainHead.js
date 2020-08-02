import React from "react";
import classes from './MainHead.module.css';
import mainImg from '../../../assets/img/main.jpg';
import mainMob from '../../../assets/img/main_mob.jpg';
import mainTab from '../../../assets/img/main_tab.jpg';
import {useSelector} from "react-redux";

export default function MainHead() {
    const { isMobile, isTablet } = useSelector(s => ({
        isMobile: s.ui.display.isMobile,
        isTablet: s.ui.display.isTablet
    }));

    return (
        <div className={classes.MainHead}>
            {/*{isMobile && <img src={mainMob} className={classes.mainMob} alt="entours main"/>}*/}
            {/*{isTablet && !isMobile*/}
            {/*    ? <img src={mainTab} className={classes.mainTab} alt="entours main"/>*/}
            {/*    : <img src={mainImg} className={classes.mainImg} alt="entours main"/>}*/}

        </div>
    )
}