import React, {useState} from 'react';
import { Link, Redirect } from "react-router-dom";
import { Query } from 'react-apollo';
import { useQuery } from "react-apollo";
import TopLoading from "../../UI/TopLoading/TopLoading";
import {FETCH_TOUR} from "../../../containers/TourContainer/queries";
import {loadingOff, loadingOn} from "../../../app/actions";
import { connect } from "react-redux";

function HyperLink({to, children}) {
    return <Link to={to}>{children}</Link>
}

function PreloadLink({to, slug, children, loadingOn, loadingOff}) {
    const [ clicked, setClicked ] = useState(false)

    function handleClick(e) {
        e.preventDefault();
        loadingOn();
        if (!clicked) setClicked(true)
    }
    return (
        <>
            {clicked && (
                <Query query={FETCH_TOUR} variables={{id: slug}}>
                    { ({loading, error}) => {
                        if (loading) {return <></>} else loadingOff();
                        if (error) return <h1>Error while fetching popular tours.</h1>
                        return <Redirect to={{
                            pathname: to,
                        }}/>
                    }
                    }
                </Query>
            )}
            <a href="/" onClick={handleClick}>{children}</a>
        </>
    )
}

export default connect(null, { loadingOn, loadingOff })(PreloadLink)