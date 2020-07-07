import React from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import qs from 'query-string';
import classes from './BookTour.module.css';

function BookTour() {
    const { location } = useHistory();
    const parsedData = qs.parse(location.search);

    if (!parsedData.tourId) return <Redirect to={'/'}/>
    console.log(parsedData)
    return (
        <div>booking a tour</div>
    )
}

export default BookTour