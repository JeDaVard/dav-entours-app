import React, { useEffect } from 'react';
// import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../../app/actions';
import classes from './UserPage.module.css';
import Separator from '../../components/UI/Separator/Separator';
import { Link } from 'react-router-dom';
import UserListings from '../../components/UserPage/UserListings/UserListings';
import UserReviews from '../../components/UserPage/UserReviews/UserReviews';
import TopLoading from '../../components/UI/TopLoading/TopLoading';
import Justicon from "../../components/UI/Justicon";

function UserPage(props) {
    const { fetchUser, location: {pathname}, user, isLoggedIn, signUp, closeSignUp } = props;
    const isThatMe = pathname.startsWith('/me')
    let reviews = [];

    useEffect(() => {
        if (isThatMe) {
            if (isLoggedIn) {
                fetchUser(props.match.params.id, isThatMe)
            } else {
                signUp()
            }
            return () => closeSignUp()
        } else {
            fetchUser(props.match.params.id)
        }
    }, [fetchUser, pathname, isLoggedIn]);

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
                {!props.loading && user.name && (
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
                                {isThatMe && <a href="/">Update image</a> }
                            </div>
                            <Separator margin={'2 2'} />
                            <div className={classes.UserPage__stats}>
                                <h3>
                                    <Justicon icon={'star'} className={classes.Justicon__star}/> <b>{reviews.length}</b>&nbsp;Reviews
                                </h3>
                                <h3> <Justicon icon={'globe'} className={classes.Justicon__globe}/> Speaks - {user.speaks}</h3>
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
                                &nbsp; {isThatMe && <Link to={'/'}>Edit profile</Link> }</h3>
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
    loading: state.user.user.loading,
    isLoggedIn: !!state.auth.token
});

const mapDispatchToState = (dispatch) => ({
    fetchUser: (id, me, readyState) => dispatch(fetchUser(id, me, readyState)),
});

export default connect(mapStateToProps, mapDispatchToState)(UserPage);
