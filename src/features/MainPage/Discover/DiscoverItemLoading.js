import React from "react";
import classes from './DiscoverItemLoading.module.css'
import ContentLoader from "react-content-loader";

export default () => (
    <div className={classes.DiscoverItemLoading}>
            <ContentLoader
                height={'100%'}
                width={'100%'}
                speed={0.7}
                gradientRatio={1}
                backgroundColor={'#1c1c1c'}
                foregroundColor={'#3b3b3b'}
                // viewBox="0 0 900 900"
            >
                <rect x="0" y="0" rx="18" ry="18" width="66%" height="100%" />
                <rect x="67.6%" y="0" rx="18" ry="18" width="32.4%" height="48.6%" />
                <rect x="67.6%" y="51.4%" rx="18" ry="18" width="32.4%" height="48.6%" />
            </ContentLoader>
    </div>
)