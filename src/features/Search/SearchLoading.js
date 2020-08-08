import classes from "./SearchLoading.module.css";
import ContentLoader from "react-content-loader";
import React from "react";

export default function SearchLoading({isMobile}) {
    return (
        <div className={classes.tourResults}>
            {[1,2,3,4].map(_ => (
                <div className={classes.tour}>
                    {isMobile ? (
                        <ContentLoader
                            height={'327px'}
                            width={'100%'}
                            speed={0.7}
                            gradientRatio={1}
                            backgroundColor={'#f1f1f1'}
                            foregroundColor={'#f8f8f8'}
                            // viewBox="0 0 400 310"
                        >
                            <rect x="0" y="0" rx="15" ry="15" width="100%" height="240px" />

                            <rect x="0" y="251" rx="3" ry="3" width="50%" height="18px" />
                            <rect x="92%" y="252" rx="3" ry="3" width="8%" height="28px" />

                            <rect x="0" y="272" rx="3" ry="3" width="60%" height="24px" />

                            <rect x="0" y="302" rx="3" ry="3" width="60px" height="20px" />
                            <rect x="74%" y="298" rx="3" ry="3" width="26%" height="24px" />
                        </ContentLoader>
                    ) : (
                        <ContentLoader
                            height={'200px'}
                            width={'100%'}
                            speed={0.7}
                            gradientRatio={1}
                            backgroundColor={'#f1f1f1'}
                            foregroundColor={'#f8f8f8'}
                            // viewBox="0 0 400 310"
                        >
                            <rect x="0" y="0" rx="15" ry="15" width="340px" height="200px" />

                            <rect x="354" y="0" rx="3" ry="3" width="140px" height="18px" />
                            <rect x="502" y="0" rx="3" ry="3" width="160px" height="18px" />

                            <rect x="354" y="22" rx="3" ry="3" width="240px" height="24px" />

                            <rect x="354" y="85" rx="3" ry="3" width="200px" height="60px" />
                            <rect x="354" y="170" rx="3" ry="3" width="60px" height="30px" />
                        </ContentLoader>
                    )}
                </div>
            ))}
        </div>
    )
}