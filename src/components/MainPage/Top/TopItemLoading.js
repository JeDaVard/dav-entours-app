import React from "react";
import ContentLoader from "react-content-loader";
import classes from './TopItemLoading.module.css'

export default () => (
    <div>
        <div className={classes.TopItemLoading}>
            <ContentLoader
                height={'140px'}
                width={'360px'}
                speed={0.7}
                gradientRatio={1}
                backgroundColor={'#f1f1f1'}
                foregroundColor={'#f8f8f8'}
                viewBox="0 0 360 140"
            >
                <circle cx="60px" cy="60px" r="50" />
                <circle cx="140px" cy="22px" r="8" />
                <rect x="160" y="13px" rx="3" ry="3" width="120" height="17" />
                <rect x="130" y="46px" rx="3" ry="3" width="120" height="14" />
                <rect x="130" y="46px" rx="3" ry="3" width="120" height="14" />
                <rect x="130" y="70px" rx="3" ry="3" width="120" height="14" />
                <rect x="130" y="94px" rx="3" ry="3" width="70" height="14" />
                <rect x="312px" y="36px" rx="3" ry="3" width="26" height="52" />
            </ContentLoader>
        </div>
    </div>
)