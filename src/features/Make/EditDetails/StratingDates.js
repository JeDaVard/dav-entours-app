import React, {useState} from "react";
import classes from "./StartingDates.module.css";
import SmallShow from "../../../components/UI/SmallShow/SmallShow";
import Justicon from "../../../components/UI/JustIcon/Justicon";
import Input from "../../../components/UI/Input/Input";
import StyledButton from "../../../components/UI/StyledButton/StyledButton";
import moment from "moment";
import {createArrSkeleton} from "../../../utils/arrUtil";

const time = createArrSkeleton(24).map((item, index) => (
    {name: index < 9 ? `0${index+1}:00`:`${index+1}:00` , value: index}
))
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    .map((item, index) => ({name: item, value: index}))
const years = createArrSkeleton(4).map((item, index) => new Date(Date.now()).getFullYear() + index)
    .map((item, index) => ({name: item.toString(), value: index}));


export default function StartingDates(props) {
    const [ state, setState ] = useState({
        startDates: [+new Date(Date.now() + 85 * 1e7)],
    })
    const inputHandler = () => {}

    return (
        <>
            <div className={classes.startingDates}>
                <SmallShow
                    handler={(trigger, opposite) => trigger(!opposite)}
                    button={
                        <div className={classes.addButton}>
                            <Justicon icon={'plus'} />
                            <span><b>Add Starting Date</b></span>
                        </div>
                    }
                >
                    <div className={classes.dateBlock}>
                        <div className={classes.main}>
                            <div>
                                <Input
                                    name={'monthInput'}
                                    value={new Date(Date.now()).getHours()+1}
                                    onChange={inputHandler}
                                    options={time}/>
                                <Input
                                    name={'dayInput'}
                                    value={new Date(Date.now()).getMonth()}
                                    onChange={inputHandler}
                                    placeholder={new Date(Date.now()).getDate()+1}
                                />
                                <Input
                                    name={'monthInput'}
                                    value={new Date(Date.now()).getMonth()}
                                    onChange={inputHandler}
                                    options={months}/>
                                <Input
                                    name={'yearInput'}
                                    value={years[0]}
                                    onChange={inputHandler}
                                    options={years}/>
                            </div>
                            <StyledButton>
                                Add
                            </StyledButton>
                            {/*<button disabled={loading} className={classes.add} onClick={e => {}}>*/}
                            {/*    {loading ? <RoundLoading /> : <Justicon*/}
                            {/*        className={`${classes.inviteIcon} ${classes.adInviteIcon}`}*/}
                            {/*        icon={'plus'} />}*/}
                            {/*</button>*/}
                        </div>

                    </div>
                </SmallShow>
            </div>
            <div>
                <div>{state.startDates.map(d => moment(d).format('dd DD MM YYYY'))}</div>
            </div>
        </>
    )
}