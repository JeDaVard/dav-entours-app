import React from "react";
import classes from './TopSearchMobile.module.css';
import TopSearch from "../../Topbar/TopSearch/TopSearch";

function TopSearchMobile() {
    return (
        <div className={classes.spaceFix}>
            <div className={classes.TopSearchMobile}>
                <TopSearch />
            </div>
        </div>
    )
}

export default TopSearchMobile;