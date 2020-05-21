import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import { connect } from 'react-redux'
import moment from "moment";
import { fetchUserSaved } from "../../app/actions";
import classes from './Saved.module.css';
import Justicon from "../../components/UI/Justicon";
import Separator from "../../components/UI/Separator/Separator";
import TopLoading from "../../components/UI/TopLoading/TopLoading";

function Saved(props) {
    const { fetchUserSaved, saved } = props
    const loading = !props.loading && !saved.length

    useEffect(() => {
        fetchUserSaved()
    }, [fetchUserSaved])

    return (
        <section className="row">
            <div className={classes.Saved}>
                <h1 className={classes.Saved__name}>Saved</h1>
                <Separator margin={'0 2'} color={'normal'}/>
                <div className={classes.Saved__content}>

                    {loading ? (
                        <TopLoading />
                    ) : (
                        saved.map( tour => (
                            <div className={classes.Saved__item}>
                                <Link to={`/tour/${tour.slug}`}>
                                    <div className={classes.Saved__imageFrame}>
                                        <img className={classes.Saved__image} src={`${process.env.REACT_APP_SERVER}/images/tour/${tour.imageCover}`} alt=""/>
                                    </div>
                                    <div className={classes.Saved__info}>
                                        <h4 className={classes.Saved__infoPart}>Participants {tour.participants.length}/{tour.maxGroupSize}</h4>
                                        <Link to={'/'}>
                                            <h2 className={classes.Saved__title}>
                                                {tour.name}
                                            </h2>
                                        </Link>
                                        <div className={classes.Saved__infoBottom}>
                                            <p>{tour.startLocation.description}</p>
                                            <p>{moment(tour.startDates[0]).format('ddd, DD MMM YYYY')}</p>
                                        </div>
                                    </div>
                                    <Link to={`/tour/${tour.slug}`}>
                                        <div className={classes.Saved__remove}>
                                            <Justicon icon={'trash'} className={classes.Saved__removeIcon}/>
                                        </div>
                                    </Link>
                                </Link>
                            </div>
                        ))
                    )}

                </div>
            </div>
        </section>
    )
}

const mapsStateToProps = state => ({
    saved: state.user.me.saved.data,
    loading: state.user.me.saved.loading
})

export default connect(mapsStateToProps, { fetchUserSaved })(Saved);