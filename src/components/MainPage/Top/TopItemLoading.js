import React from "react";
import ContentLoader from "react-content-loader";
import classes from './TopItemLoading.module.css'

export default () => (
    <div>
        <div className={classes.TopItemLoading}>
            <ContentLoader
                height={'14rem'}
                width={'36rem'}
                speed={0.7}
                gradientRatio={1}
                backgroundColor={'#f1f1f1'}
                foregroundColor={'#f8f8f8'}
                viewBox="0 0 360 140"
            >
                <circle cx="60px" cy="60px" r="50" />
                <circle cx="14rem" cy="2.2rem" r="8" />
                <rect x="16rem" y="1.3rem" rx="3" ry="3" width="120" height="17" />
                <rect x="13rem" y="4.6rem" rx="3" ry="3" width="120" height="14" />
                <rect x="13rem" y="4.6rem" rx="3" ry="3" width="120" height="14" />
                <rect x="13rem" y="7rem" rx="3" ry="3" width="120" height="14" />
                <rect x="13rem" y="9.4rem" rx="3" ry="3" width="70" height="14" />
                <rect x="31.2rem" y="3.6rem" rx="3" ry="3" width="26" height="52" />
            </ContentLoader>
        </div>
    </div>
)