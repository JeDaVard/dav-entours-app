import React from "react";
import {Link} from "react-router-dom";
import { connect } from 'react-redux'
import classes from './Saved.module.css';
import Justicon from "../../components/UI/Justicon";
import Separator from "../../components/UI/Separator/Separator";

function Saved(props) {
    return (
        <div className="row">
            <div className={classes.Saved}>
                <h1 className={classes.Saved__name}>Saved</h1>
                <Separator margin={'0 2'} color={'normal'}/>
                <div className={classes.Saved__content}>

                    <div className={classes.Saved__item}>
                        <div className={classes.Saved__imageFrame}>
                            <img className={classes.Saved__image} src="http://localhost:5000/images/tour/tour-1-cover.jpg" alt=""/>
                        </div>
                        <div className={classes.Saved__info}>
                            <h4 className={classes.Saved__infoPart}>Participants</h4>
                            <h2 className={classes.Saved__title}>
                                Nice Tour
                            </h2>
                            <div className={classes.Saved__infoBottom}>
                                <p>Location</p>
                                <p>Date</p>
                            </div>
                        </div>
                        <Link to="/">
                            <div className={classes.Saved__remove}>
                                <Justicon icon={'trash'} className={classes.Saved__removeIcon}/>
                            </div>
                        </Link>
                    </div>

                    <div className={classes.Saved__item}>
                        <div className={classes.Saved__imageFrame}>
                            <img className={classes.Saved__image} src="http://localhost:5000/images/tour/tour-1-cover.jpg" alt=""/>
                        </div>
                        <div className={classes.Saved__info}>
                            <h4 className={classes.Saved__infoPart}>Participants</h4>
                            <h2 className={classes.Saved__title}>
                                Nice Tour
                            </h2>
                            <div className={classes.Saved__infoBottom}>
                                <p>Location</p>
                                <p>Date</p>
                            </div>
                        </div>
                        <Link to="/">
                            <div className={classes.Saved__remove}>
                                <Justicon icon={'trash'} className={classes.Saved__removeIcon}/>
                            </div>
                        </Link>
                    </div>

                    <div className={classes.Saved__item}>
                        <div className={classes.Saved__imageFrame}>
                            <img className={classes.Saved__image} src="http://localhost:5000/images/tour/tour-1-cover.jpg" alt=""/>
                        </div>
                        <div className={classes.Saved__info}>
                            <h4 className={classes.Saved__infoPart}>Participants</h4>
                            <h2 className={classes.Saved__title}>
                                Nice Tour
                            </h2>
                            <div className={classes.Saved__infoBottom}>
                                <p>Location</p>
                                <p>Date</p>
                            </div>
                        </div>
                        <Link to="/">
                            <div className={classes.Saved__remove}>
                                <Justicon icon={'trash'} className={classes.Saved__removeIcon}/>
                            </div>
                        </Link>
                    </div>

                    <div className={classes.Saved__item}>
                        <div className={classes.Saved__imageFrame}>
                            <img className={classes.Saved__image} src="http://localhost:5000/images/tour/tour-1-cover.jpg" alt=""/>
                        </div>
                        <div className={classes.Saved__info}>
                            <h4 className={classes.Saved__infoPart}>Participants</h4>
                            <h2 className={classes.Saved__title}>
                                Nice Tour
                            </h2>
                            <div className={classes.Saved__infoBottom}>
                                <p>Location</p>
                                <p>Date</p>
                            </div>
                        </div>
                        <Link to="/">
                            <div className={classes.Saved__remove}>
                                <Justicon icon={'trash'} className={classes.Saved__removeIcon}/>
                            </div>
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    )
}

const mapsStateToProps = state => ({

})

export default connect(mapsStateToProps, {})(Saved);