import React from "react";
import ContentLoader from "react-content-loader";

export default () => (
    <>
        <ContentLoader
            height={'44vw'}
            width={'90vw'}
            speed={0.7}
            gradientRatio={1}
            backgroundColor={'#1c1c1c'}
            foregroundColor={'#3b3b3b'}
            // viewBox="0 0 90vw 90vw"
        >
            <rect x="0" y="0" rx="18" ry="18" width="44vw" height="44vw" />
            <rect x="45vw" y="0" rx="18" ry="18" width="22vw" height="22vw" />
            <rect x="68vw" y="0" rx="18" ry="18" width="22vw" height="22vw" />
            <rect x="45vw" y="23vw" rx="18" ry="18" width="45vw" height="21vw" />
        </ContentLoader>

    </>
)