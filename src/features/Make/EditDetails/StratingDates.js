import React, {useState} from "react";
import classes from "./StartingDates.module.css";
import SmallShow from "../../../components/UI/SmallShow/SmallShow";
import Justicon from "../../../components/UI/JustIcon/Justicon";
import Input from "../../../components/UI/Input/Input";
import StyledButton from "../../../components/UI/StyledButton/StyledButton";
import moment from "moment";
import { createArrSkeleton } from "../../../utils/arrUtil";
import { useMutation, useQuery } from "@apollo/client";
import { FETCH_STARTS, MANAGE_STARTS } from "./queries";
import DotLoading from "../../../components/UI/DotLoading/DotLoading";

const time = createArrSkeleton(24).map((item, index) => (
    {name: index < 9 ? `0${index+1}:00`:`${index+1}:00` , value: index + 1}
))
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    .map((item, index) => ({name: item, value: index + 1}))
const years = createArrSkeleton(4).map((item, index) => new Date(Date.now()).getFullYear() + index)
    .map(item => ({name: item.toString(), value: item}));


export default function StartingDates({ slug, id }) {
    const [ input, setInput ] = useState({
        time: (new Date(Date.now()).getHours() + 1).toString(),
        day: (new Date(Date.now()).getDate() + 1).toString(),
        month: (new Date(Date.now()).getMonth() + 1).toString(),
        year: years[0].value.toString()
    })

    const { loading, data } = useQuery(FETCH_STARTS, {
        variables: { slug }
    })

    const [ editStarts ] = useMutation(MANAGE_STARTS)

    const startDates = data ? data.me.myTour.starts : [];

    const inputHandler = e => {
        const { value, name } = e.target;
        setInput(p => ({
            ...p,
            [name]: value
        }))
    }

    const startHandler = (e, date, startId) => {
        e.preventDefault();

        if (date) {
            const ts = moment()
                .year(+input.year)
                .month(+input.month)
                .date(+input.day)
                .hour(+input.time)
                .minute(0)
                .second(0)
                .millisecond(0)
                .unix() * 1000;

            editStarts({
                variables: {
                    id,
                    date: ts
                }
            }).then(r => console.log(r)).catch(e => console.log(e))
        }
        if (startId) {
            editStarts({
                variables: {
                    id,
                    startId
                }
            }).then(r => console.log(r)).catch(e => console.log(e))
        }
    }
    return (
        <>
            <div className={classes.startingDates}>
                <SmallShow
                    handler={(trigger, opposite) => trigger(!opposite)}
                    button={
                        <div className={classes.addButton}>
                            <Justicon icon={'plus'} />
                            <span><b>New Start Date</b></span>
                        </div>
                    }
                >
                    <div className={classes.dateBlock}>
                        <div className={classes.main}>
                            <div>
                                <Input
                                    name="time"
                                    value={input.time}
                                    onChange={inputHandler}
                                    options={time}/>
                                <Input
                                    type="text"
                                    name="day"
                                    value={input.day}
                                    onChange={inputHandler}
                                    placeholder={'DD'}
                                />
                                <Input
                                    name={'month'}
                                    value={input.month}
                                    onChange={inputHandler}
                                    options={months}/>
                                <Input
                                    name={'year'}
                                    value={input.year}
                                    onChange={inputHandler}
                                    options={years}/>
                            </div>
                            <StyledButton onClick={e => startHandler(e, true)}>
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
            <div className={classes.startList}>
                {loading ? <DotLoading /> : startDates.slice().sort((a,b) => b-a).map(d => (
                    <div className={classes.startItem} key={d._id}>
                        <div className={classes.startState}>
                            <Justicon icon={new Date(d.date) < Date.now() ? 'check-square' : 'calendar'} className={classes.removeIcon}/>
                        </div>
                        <div className={classes.startMain}>
                            <h2>{moment(d.date).format('DD MMMM YYYY, HH:mm, dd')}</h2>
                            <div><p><b>{d.participants.length}</b> orders for now</p></div>
                        </div>
                        <button onClick={e => startHandler(e, null, d._id)} className={classes.removeButton}>
                            <Justicon icon={'trash'} className={classes.removeIcon}/>
                        </button>
                    </div>
                ))}
            </div>
        </>
    )
}