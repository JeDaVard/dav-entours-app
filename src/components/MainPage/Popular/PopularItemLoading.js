import React from "react";
import classes from "./PopularItemLoading.module.css";
import ContentLoader from "react-content-loader";

export default () => (
    <div className={classes.itemContainer}>
        <div className={classes.tour}>
            <ContentLoader
                height={'100%'}
                width={'100%'}
                speed={0.7}
                gradientRatio={1}
                backgroundColor={'#f1f1f1'}
                foregroundColor={'#f8f8f8'}
                // viewBox="0 0 400 310"
            >
                <rect x="0" y="0" rx="3" ry="3" width="100%" height="77%" />
                <rect x="4%" y="80%" rx="3" ry="3" width="92%" height="7%" />
                <circle cx="6.6%" cy="93.8%" r="14" />
                <rect x="12%" y="92%" rx="3" ry="3" width="30%" height="4%" />
                <rect x="45%" y="92%" rx="3" ry="3" width="50%" height="4%" />
            </ContentLoader>
        </div>
    </div>
)