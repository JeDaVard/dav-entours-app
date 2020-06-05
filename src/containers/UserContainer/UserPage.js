import React  from 'react';
// import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import { FETCH_USER } from "./queries";
import classes from './UserPage.module.css';
import Separator from '../../components/UI/Separator/Separator';
import { Link } from 'react-router-dom';
import UserListings from '../../components/UserPage/UserListings/UserListings';
import UserReviews from '../../components/UserPage/UserReviews/UserReviews';
import TopLoading from '../../components/UI/TopLoading/TopLoading';
import Justicon from "../../components/UI/Justicon";

function UserPage(props) {
    const { match: {params} } = props;
    const isThatMe = params.id === props.userId

    return (
        <div className={classes.UserPage}>
            <div className="row">
                <Query query={FETCH_USER} variables={{id: params.id}}>
                    {
                        ({loading, error, data}) => {
                            if (loading) return <TopLoading />
                            if (error) return <h1>Error while fetching user profile</h1>
                            const { user } = data;
                            return (
                                <div className={classes.UserPage__content}>
                                    <section className={classes.UserPage__profile}>
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
                                        <Separator margin={'2 2'} color={'normal'}/>
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
                                        <Separator margin={'2 2'} color={'normal'}/>
                                        <div className={classes.UserPage__stats}>
                                            <h3>
                                                <Justicon icon={'star'} className={classes.Justicon__star}/> <b>{user.reviews.length}</b>&nbsp;Reviews
                                            </h3>
                                            <h3> <Justicon icon={'globe'} className={classes.Justicon__globe}/> Speaks - {user.speaks}</h3>
                                        </div>
                                    </section>
                                    <div className={classes.UserPage__more}>
                                        <Separator margin={'0 2'} />
                                        {user.tours.length > 0 && (
                                            <>
                                                <UserListings tours={user.tours}/>
                                                <Separator margin={'2 2'} />
                                            </>
                                        )}
                                        <UserReviews reviews={user.reviews} />
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

const mapStateToProps = (state) => ({
    isLoggedIn: !!state.auth.token,
    userId: state.auth.userId
});

export default connect(mapStateToProps, null)(UserPage);
