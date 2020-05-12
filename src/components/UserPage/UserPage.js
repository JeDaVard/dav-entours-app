import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser, fetchMe } from '../../app/actions';
import classes from './UserPage.module.css';
import Separator from '../UI/Separator/Separator';
import { Link } from 'react-router-dom';
import UserListings from './UserListings/UserListings';
import UserReviews from './UserReviews/UserReviews';
import TopLoading from '../UI/TopLoading/TopLoading';

function UserPage(props) {
    const { fetchUser, fetchMe, location: {pathname} } = props;
    let user = pathname.startsWith('/me') ? props.me : props.user;
    console.log(props)
    let reviews = [];

    // if (props.match.params.id === props.myID) {
    //     <Redirect to={'/me'}/>
    // }

    useEffect(() => {
        if (pathname.startsWith('/me')) {
            fetchMe()
        } else {
            fetchUser(props.match.params.id)
        }
    }, [fetchUser, fetchMe, pathname]);

    if (user.tours && user.tours.length) {
        user.tours
            .map((tour) =>
                tour.reviews.map( (review) => ({
                    ...review,
                    participated: {
                        image: tour.imageCover,
                        name: tour.name,
                        slug: tour.slug
                    }
                })))
            .forEach((arr) => (reviews = [...reviews, ...arr]));
    }

    return (
        <div className={classes.UserPage}>
            <div className="row">
                {user.name ? (
                    <div className={classes.UserPage__content}>
                        <section className={classes.UserPage__profile}>
                            <div className={classes.UserPage__profileTop}>
                                <h2>{user.name}</h2>
                                <div className={classes.UserPage__photoFrame}>
                                    <div className={classes.UserPage__photo}>
                                        <img
                                            src={`${process.env.REACT_APP_SERVER}/images/user/${user.photo}`}
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <a href="/">Update image</a>
                            </div>
                            <Separator margin={'2 2'} />
                            <div className={classes.UserPage__stats}>
                                <h3>
                                    <b>{reviews.length}</b> Reviews
                                </h3>
                                <h3>Speaks - {user.speaks}</h3>
                            </div>
                            <Separator margin={'2 2'} />
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
                            </h3>
                            <h3>&nbsp;&nbsp;·&nbsp;&nbsp;</h3>
                            <Link to={'/'}>Edit profile</Link>
                            <p>{user.about}</p>
                        </section>
                        <div className={classes.UserPage__more}>
                            <Separator margin={'0 2'} />
                            {user.tours.length > 0 && (
                                <>
                                    <UserListings tours={user.tours}/>
                                    <Separator margin={'2 2'} />
                                </>
                            )}
                            <UserReviews reviews={reviews} />
                        </div>
                    </div>
                ) : (
                    <TopLoading />
                )}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    user: state.user.user.data,
    loading: state.user.user.loading,
    me: state.user.me.data,
    meLoading: state.user.me.loading,
    myID: state.auth.userId
});

const mapDispatchToState = (dispatch) => ({
    fetchUser: (id, readyState) => dispatch(fetchUser(id, readyState)),
    fetchMe: () => dispatch(fetchMe()),
});

export default connect(mapStateToProps, mapDispatchToState)(UserPage);
