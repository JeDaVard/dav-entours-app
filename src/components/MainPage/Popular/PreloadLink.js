import React, {useState} from 'react';
import { Redirect } from "react-router-dom";
import { Query } from 'react-apollo';
import {loadingOff, loadingOn} from "../../../app/actions";
import { connect } from "react-redux";

function PreloadLink({to, id, children, loadingOn, query, className}) {
    const [ clicked, setClicked ] = useState(false)

    function handleClick(e) {
        e.preventDefault();
        loadingOn();
        if (!clicked) setClicked(true)
    }
    return (
        <>
            {clicked && (
                <Query query={query} variables={{id}}>
                    { ({loading, error}) => {
                        if (loading) return <></>;
                        if (error) return <h1>Error while fetching popular tours.</h1>
                        return <Redirect to={{
                            pathname: to,
                        }}/>
                    }
                    }
                </Query>
            )}
            <a href="/" className={className && className} onClick={handleClick}>{children}</a>
        </>
    )
}

export default connect(null, { loadingOn })(PreloadLink)