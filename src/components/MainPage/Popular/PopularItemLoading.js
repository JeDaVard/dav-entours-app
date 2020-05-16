import React from "react";
import classes from "./PopularItemLoading.module.css";
import ContentLoader from "react-content-loader";

export default () => (
    <div className={classes.PopularItemLoading__itemcontainer}>
        <div className={classes.PopularItemLoading__tour}>
            <ContentLoader
                height={310}
                width={400}
                speed={0.7}
                gradientRatio={1}
                backgroundColor={'#f1f1f1'}
                foregroundColor={'#f8f8f8'}
                viewBox="0 0 400 310"
            >
                <rect x="0" y="0" rx="3" ry="3" width="400" height="220" />
                <rect x="10" y="230" rx="3" ry="3" width="380" height="24" />
                <circle cx="24" cy="284" r="14" />
                <rect x="44" y="278" rx="3" ry="3" width="110" height="12" />
                <rect x="190" y="278" rx="3" ry="3" width="80" height="12" />
                <rect x="300" y="278" rx="3" ry="3" width="80" height="12" />
            </ContentLoader>
        </div>
    </div>
)