import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../../app/actions';
import classes from './UserPage.module.css';
import Separator from '../../components/UI/Separator/Separator';
import { Link } from 'react-router-dom';
import UserListings from '../../components/UserPage/UserListings/UserListings';
import UserReviews from '../../components/UserPage/UserReviews/UserReviews';
import TopLoading from '../../components/UI/TopLoading/TopLoading';

function UserPage(props) {
    const { fetchUser, location: {pathname}, user, isLoggedIn, signUp, closeSignUp } = props;
    let reviews = [];

    useEffect(() => {
        if (isLoggedIn) {
            fetchUser(props.match.params.id, pathname.startsWith('/me'))
        } else {
            signUp()
        }
        return () => closeSignUp()
    }, [fetchUser, pathname]);

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
            {props.loading && <TopLoading />}
            <div className="row">
                {user.name && (
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
                )}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    user: state.user.user.data,
    loading: state.user.user.loading
});

const mapDispatchToState = (dispatch) => ({
    fetchUser: (id, me, readyState) => dispatch(fetchUser(id, me, readyState)),
});

export default connect(mapStateToProps, mapDispatchToState)(UserPage);
