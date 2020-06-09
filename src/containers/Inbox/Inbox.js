import React from "react";
import classes from './Inbox.module.css';
import userImg from './img.jpeg'
import Separator from "../../components/UI/Separator/Separator";
import Justicon from "../../components/UI/Justicon";


function Inbox() {

    return (
        <section className="row">
            <div className={classes.Inbox}>
                <h1 className={classes.Inbox__title}>Inbox</h1>
                <Separator margin={'0 1'} color={'normal'} />
                
                <div className={classes.Inbox__conversation}>
                    <div className={classes.Inbox__userImage}>
                        <img src={userImg} alt="useName"/>
                    </div>
                    <div className={classes.Inbox__mainBlock}>
                        <div className={classes.Inbox__userName}>
                            <h2>Vladislav The Poker</h2>
                            <div className={classes.Inbox__date}>
                                <h4>Sat, 12 Jun 2020</h4>
                                <Justicon icon={'chevron-right'} className={classes.Inbox__dateArrow} />
                            </div>
                        </div>
                        <div><p>When I first became a vampire, I was quite tyrannical</p></div>
                    </div>
                </div>
                <div className={classes.Inbox__conversation}>
                    <div className={classes.Inbox__userImage}>
                        <img src={userImg} alt="useName"/>
                    </div>
                    <div className={classes.Inbox__mainBlock}>
                        <div className={classes.Inbox__userName}>
                            <h2>Vladislav The Poker</h2>
                            <div className={classes.Inbox__date}>
                                <h4>Sat, 12 Jun 2020</h4>
                                <Justicon icon={'chevron-right'} className={classes.Inbox__dateArrow} />
                            </div>
                        </div>
                        <div><p>When I first became a vampire, I was quite tyrannical</p></div>
                    </div>
                </div>


            </div>
        </section>
    )
}

export default Inbox