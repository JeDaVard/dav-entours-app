import React, { lazy, Suspense } from "react";

const lazyLoading = (importFunc, { fallback = null }) => {
    const LazyComponent = lazy(importFunc);
    return props => (
        <Suspense fallback={fallback}>
            <LazyComponent {...props} />
        </Suspense>
    );
};

lazyLoading.defaultProps = {
    fallback: null
};

export default lazyLoading;

// ############## USAGE ###############

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