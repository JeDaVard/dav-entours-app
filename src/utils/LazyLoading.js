import React, { lazy, Suspense } from "react";
import store from '../app/store'

const s = store.getState();
const isMobile = s.ui.display.isMobile;

const lazyLoading = (importFunc, { fallback, mobileFallback }) => {
    const LazyComponent = lazy(importFunc);
    return props => (
        <Suspense fallback={isMobile ? mobileFallback || fallback : fallback}>
            <LazyComponent {...props} />
        </Suspense>
    );
};

lazyLoading.defaultProps = {
    fallback: null,
    mobileFallback: null
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