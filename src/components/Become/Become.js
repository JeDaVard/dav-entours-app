import React from "react";
import classes from './Become.module.css';

function Become() {
    return (
        <section className={classes.Become}>
            <div className="row">
                <div className={classes.Become__title}>
                    <h2>Become a tourmaker</h2>
                </div>
                <div className={classes.Become__content}>
                    <div className={classes.Become__left}>
                        <div className={classes.Become__proposition}>
                            <h3>Earn from $700 monthly</h3>
                            <h3>Communicate with others</h3>
                        </div>
                        <div className={classes.Become__button}>
                            <button>Start now</button>
                        </div>
                    </div>
                    <div className={classes.Become__right}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam amet animi aut, commodi dolor eligendi laborum libero nemo neque possimus! Atque deserunt earum facere nihil saepe. Alias illum labore vel!
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Become