import React from 'react';
import { Redirect } from "react-router-dom";
import { useLazyQuery} from '@apollo/client';
import { loadingOn } from "../../../app/actions";
import { connect } from "react-redux";

function PreloadLink({to, id, children, loadingOn, query, className}) {
    const [ fetchItem, { data, error } ] = useLazyQuery(query, { variables: { id }})

    function handleClick(e) {
        e.preventDefault();
        loadingOn();
        fetchItem();
    }

    if (data) return <Redirect to={to} />
    if ( error ) return <h2>Error while fetching</h2>
    return <a href="/" className={className && className} onClick={handleClick}>{children}</a>
}

export default connect(null, { loadingOn })(PreloadLink)