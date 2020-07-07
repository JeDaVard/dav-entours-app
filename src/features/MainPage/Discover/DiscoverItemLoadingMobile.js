import React from "react";
import ContentLoader from "react-content-loader";
import classes from './DiscoverItemLoadingMobile.module.css'

function DiscoverItemLoadingMobile() {
    return (
        <div className={classes.DiscoverItemLoadingMobile}>
            <ContentLoader
                height={'100%'}
                width={'100%'}
                speed={0.7}
                gradientRatio={1}
                backgroundColor={'#1c1c1c'}
                foregroundColor={'#3b3b3b'}
                // viewBox="0 0 900 900"
            >
                <rect x="0" y="0" rx="18" ry="18" width="100%" height="100%" />
            </ContentLoader>
        </div>
    )
}

export default DiscoverItemLoadingMobile