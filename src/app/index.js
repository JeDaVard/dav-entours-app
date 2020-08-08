import lazyLoading from "../utils/lazyLoading";
import TopLoading from "../components/UI/TopLoading/TopLoading";
import TourHeadLoading from "../features/TourContainer/TourHead/TourHeadLoading";
import TourHeadLoadingMobile from "../features/TourContainer/TourHead/TourHeadLoadingMobile";
import React from "react";

export const LazyBook = lazyLoading(() => import('../features/Book/Book'), {
    fallback: <TopLoading /> }
);

export const LazyTourPage = lazyLoading(() => import('../features/TourContainer/TourPage'), {
        fallback: <TourHeadLoading />,
        mobileFallback: <TourHeadLoadingMobile />
    }
);
export const LazyUserPage = lazyLoading(() => import('../features/UserPage/UserPage'), {
    fallback: <TopLoading /> }
);
export const LazyMyTours = lazyLoading(() => import('../features/MyTours/MyTours'), {
    fallback: <TopLoading /> }
);
export const LazyMake = lazyLoading(() => import('../features/Make/Make'), {
    fallback: <TopLoading /> }
);
export const LazyInbox = lazyLoading(() => import('../features/Inbox/Inbox'), {
    fallback: <TopLoading /> }
);
export const LazyConversation = lazyLoading(() => import('../features/Inbox/Conversation/Conversation'), {
    fallback: <TopLoading /> }
);
export const LazySaved = lazyLoading(() => import('../features/MyTours/Saved/Saved'), {
    fallback: <TopLoading /> }
);
export const LazyTourEvents = lazyLoading(() => import('../features/TourEvents/TourEvents'), {
    fallback: <TopLoading /> }
);
export const LazySearchResults = lazyLoading(() => import('../features/SearchResults/SearchResults'), {
    fallback: <TopLoading /> }
);
export const LazyEditTour = lazyLoading(() => import('../features/Make/EditTour'), {
    fallback: <TopLoading /> }
);
export const LazyMobileTopSearch = lazyLoading(() => import('../features/MobileSearch/MobileTopSearch'), {
    fallback: <TopLoading /> }
);