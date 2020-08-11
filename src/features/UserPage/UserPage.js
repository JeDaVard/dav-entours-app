import React from 'react';
import { Query } from '@apollo/client/react/components';
import { FETCH_USER } from "./queries";
import classes from './UserPage.module.css';
import Separator from '../../components/UI/Separator/Separator';
import { Link, Redirect, useParams } from 'react-router-dom';
import UserListings from './UserListings/UserListings';
import UserReviews from './UserReviews/UserReviews';
import TopLoading from '../../components/UI/TopLoading/TopLoading';
import Justicon from "../../components/UI/JustIcon/Justicon";
import { getCookie } from "../../utils/cookies";
import ScrollToTop from "../../components/UI/ScrollToTop";
import UserAvatar from "../../components/UI/UserAvatar/UserAvatar";
import {useDispatch} from "react-redux";
import {SHOW_PROFILE_PHOTO} from "../../app/actions/ui/types";

function UserPage() {
    const { id } = useParams();
    const isThatMe = id === getCookie('userId');

    const dispatch = useDispatch()

    return (
        <div className={classes.UserPage}>
            <div className="row">
                <Query query={FETCH_USER}
                       notifyOnNetworkStatusChange={true}
                       variables={{ id, page: 1, limit: 4 }}>
                    {
                        ({loading, error, data, fetchMore}) => {
                            if (loading && !data) return <TopLoading />
                            if (error) return <h1>Error while fetching user profile</h1>
                            if (!data.user) return <Redirect to={'/oops-not-found'}/>
                            const { user } = data;
                            return (
                                <div className={classes.content}>
                                    <ScrollToTop />
                                    <section className={classes.profile}>
                                        <h2>
                                            Hi, I'm{' '}
                                            {user && user.name.split(' ')[0]}
                                        </h2>
                                        <h3>
                                            Joined{' '}
                                            {new Date(user.createdAt).getMonth() +
                                            1 +
                                            ' ' +
                                            new Date(
                                                user.createdAt
                                            ).getFullYear()}
                                            &nbsp; {isThatMe && <Link to={'#'} onClick={() => dispatch({type: SHOW_PROFILE_PHOTO})}>Edit profile</Link> }</h3>
                                        <p>{user.about}</p>
                                        <Separator margin={'2 2'} color={'normal'}/>
                                        <div className={classes.profileTop}>
                                            <h2>{user.name}</h2>
                                            <div className={classes.photoFrame}>
                                                <div className={classes.photo}>
                                                    <UserAvatar alt={user.name}
                                                                src={user.photo}
                                                                medium />
                                                </div>
                                            </div>
                                            {isThatMe && <a href="#" onClick={() => dispatch({type: SHOW_PROFILE_PHOTO})}>Update image</a> }
                                        </div>
                                        <Separator margin={'2 2'} color={'normal'}/>
                                        <div className={classes.stats}>
                                            <h3>
                                                <Justicon icon={'star'} className={classes.Justicon__star}/> <b>{user.reviews.length}</b>&nbsp;Reviews
                                            </h3>
                                            <h3> <Justicon icon={'globe'} className={classes.Justicon__globe}/> Speaks - {user.speaks}</h3>
                                        </div>
                                    </section>
                                    <div className={classes.more}>
                                        <Separator margin={'0 2'} />
                                        {user.tours.length > 0 && (
                                            <>
                                                <UserListings tours={user.tours}/>
                                                <Separator margin={'2 2'} />
                                            </>
                                        )}
                                        <UserReviews user={user}
                                                     more={fetchMore}
                                                     loading={loading}
                                        />
                                    </div>
                                </div>
                            )
                        }
                    }
                </Query>
            </div>
        </div>
    );
}

export default UserPage