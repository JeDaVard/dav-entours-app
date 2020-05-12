import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../../app/actions';
import classes from './UserPage.module.css';
import Separator from '../UI/Separator/Separator';
import { Link } from 'react-router-dom';
import UserListings from './UserListings/UserListings';
import UserReviews from './UserReviews/UserReviews';
import Loading2 from '../UI/Loading/Loading2';
import TopLoading from '../UI/TopLoading/TopLoading';

function UserPage(props) {
    const { fetchUser } = props;
    let reviews = [];

    useEffect(() => {
        fetchUser(props.match.params.id);
    }, [fetchUser]);

    if (props.user.tours) {
        props.user.tours
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
                {props.user.name ? (
                    <div className={classes.UserPage__content}>
                        <section className={classes.UserPage__profile}>
                            <div className={classes.UserPage__profileTop}>
                                <h2>{props.user.name}</h2>
                                <div className={classes.UserPage__photoFrame}>
                                    <div className={classes.UserPage__photo}>
                                        <img
                                            src={`http://localhost:5000/images/user/${props.user.photo}`}
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
                                <h3>Speaks - {props.user.speaks}</h3>
                            </div>
                            <Separator margin={'2 2'} />
                            <h2>
                                Hi, I'm{' '}
                                {props.user && props.user.name.split(' ')[0]}
                            </h2>
                            <h3>
                                Joined{' '}
                                {new Date(props.user.createdAt).getMonth() +
                                    1 +
                                    ' ' +
                                    new Date(
                                        props.user.createdAt
                                    ).getFullYear()}
                            </h3>
                            <h3>&nbsp;&nbsp;·&nbsp;&nbsp;</h3>
                            <Link to={'/'}>Edit profile</Link>
                            <p>{props.user.about}</p>
                        </section>
                        <div className={classes.UserPage__more}>
                            <Separator margin={'0 2'} />
                            {props.user.tours.length > 0 && (
                                <>
                                    <UserListings />
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
});

const mapDispatchToState = (dispatch) => ({
    fetchUser: (id, readyState) => dispatch(fetchUser(id, readyState)),
});

export default connect(mapStateToProps, mapDispatchToState)(UserPage);
