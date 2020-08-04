import classes from "./Participants.module.css";
import Justicon from "../../components/UI/JustIcon/Justicon";
import Separator from "../../components/UI/Separator/Separator";
import React from "react";

export default function Participants(props) {
    const { participantsHandler, participants, maxGroupSize } = props;

    return (
        <div className={classes.participantsBlock}>
            <div className={classes.section}>
                <div className={classes.types}>
                    <h2>Participants</h2>
                    <p>People going with you</p>
                </div>
                <div className={classes.counter}>
                    <button className={classes.prButton}
                            onClick={participantsHandler}
                            id="minusParticipant"
                            disabled={participants <= 1}>
                        <Justicon icon={'minus'} className={classes.pIcon}/>
                    </button>
                    <div className={classes.participants}><h2>{participants}</h2></div>
                    <button className={classes.prButton}
                            onClick={participantsHandler}
                            id="plusParticipant"
                            disabled={participants >= 25}>
                        <Justicon icon={'plus'} className={classes.pIcon}/>
                    </button>
                </div>
            </div>
            <Separator color={'normal'} />
            <div className={classes.section}>
                <div className={classes.types}>
                    <h2>Group Size</h2>
                    <p>Maximum tour places</p>
                </div>
                <div className={classes.counter}>
                    <button className={classes.prButton}
                            onClick={participantsHandler}
                            id="minusMaxGroupSize"
                            disabled={maxGroupSize <= 1}>
                        <Justicon icon={'minus'} className={classes.pIcon}/>
                    </button>
                    <div className={classes.participants}><h2>{maxGroupSize}</h2></div>
                    <button className={classes.prButton}
                            onClick={participantsHandler}
                            id="plusMaxGroupSize"
                            disabled={maxGroupSize >= 25}>
                        <Justicon icon={'plus'} className={classes.pIcon}/>
                    </button>
                </div>
            </div>
        </div>
    )
}