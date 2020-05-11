import React, { lazy, Suspense } from "react";

const LazyLoading = (importFunc, { fallback = null }) => {
    const LazyComponent = lazy(importFunc);
    return props => (
        <Suspense fallback={fallback}>
            <LazyComponent {...props} />
        </Suspense>
    );
};

LazyLoading.defaultProps = {
    fallback: null
};

export default LazyLoading;


// const About = lazyLoading(
//     () => {
//         return new Promise(resolve => {
//             setTimeout(() => resolve(import("./About")), 3000);
//         });
//     },
//     {
//         fallback: <ProgressBar />
//     }
// );