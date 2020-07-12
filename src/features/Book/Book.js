import React from 'react';
import { Route } from 'react-router-dom';
import BookTour from "./BookTour/BookTour";
import NotFound from "../../app/NotFound/NotFound";
import lazyLoading from "../../utils/lazyLoading";
import TopLoading from "../../components/UI/TopLoading/TopLoading";


const LazyPayment = lazyLoading(() => import('../Payment/Payment'), {
    fallback: <TopLoading /> }
);

export default function Book() {
    return (
        <>
            <Route path="/payments/book" component={BookTour} />
            {/*<Route path="/payments/book/pay" component={LazyPayment} />*/}
        </>
    )
}