import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { fetchUser } from "../../app/actions";
import classes from './UserPage.module.css';
import Separator from '../UI/Separator/Separator';
import { Link } from 'react-router-dom';
import UserListings from "./UserListings/UserListings";
import UserReviews from "./UserReviews/UserReviews";
import Loading2 from "../UI/Loading/Loading2";

function UserPage(props) {
    const { fetchUser } = props;

    useEffect(() => {
        fetchUser(props.match.params.id)
    }, [fetchUser])
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
                            <Separator margin={'2'} />
                            <div className={classes.UserPage__stats}>
                                <h3>
                                    <b>{props.user.reviews.length}</b> Reviews
                                </h3>
                                <h3>Speaks - {props.user.speaks}</h3>
                            </div>
                            <Separator margin={'2'} />
                            <h2>Hi, I'm {props.user && props.user.name.split(' ')[0]}</h2>
                            <h3>Joined {new Date(props.user.createdAt).getMonth()+1 + ' ' + new Date(props.user.createdAt).getFullYear()}</h3>
                            <h3>&nbsp;&nbsp;·&nbsp;&nbsp;</h3>
                            <Link to={'/'}>Edit profile</Link>
                            <p>
                                {props.user.about}
                            </p>
                        </section>
                        <div className={classes.UserPage__more}>
                            <div style={{ padding: '0 0 1rem 0' }}>
                                <Separator />
                            </div>
                            <UserListings />
                            <Separator margin={'2'} />
                            <UserReviews />
                        </div>
                    </div>
            ) : <Loading2 />}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.user.user.data,
    loading: state.user.user.loading
})

const mapDispatchToState = dispatch => ({
    fetchUser: (id, readyState) => dispatch(fetchUser(id, readyState))
})

export default connect(mapStateToProps, mapDispatchToState)(UserPage);
