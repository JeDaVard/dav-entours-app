import React, {useState} from "react";
import { useHistory } from 'react-router-dom';
import classes from './Make.module.css';
import t from './1-1.jpg'
import StyledButton from "../../components/UI/StyledButton/StyledButton";
import Separator from "../../components/UI/Separator/Separator";
import Input from "../../components/UI/Input/Input";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css"
import {useMutation} from "@apollo/react-hooks";
import {MAKE_A_TOUR} from "./queries";
import TopLoading from "../../components/UI/TopLoading/TopLoading";


function Make() {
    const history = useHistory()
    const [ input, setInput ] = useState({
        name: '',
        difficulty: 'easy',
        maxGroupSize: 4,
    })

    const [makeATour, { loading }] = useMutation(MAKE_A_TOUR, {
        variables: {
            name: input.name,
            difficulty: input.difficulty,
            maxGroupSize: input.maxGroupSize
        }
    })

    const maxGroupSizeOptions = []
    for (let i = 1; i <= 20; i++) {
        maxGroupSizeOptions.push({value: i, name: `Group Size: ${i}`})
    }
    const difficultyOptions = [
        {value: 'easy', name: 'Difficulty: Easy'},
        {value: 'medium', name: 'Difficulty: Medium'},
        {value: 'hard', name: 'Difficulty: Hard'}
    ]

    const onMakeATour = (e) => {
        e.preventDefault();

        makeATour()
            .then((res) => {
                history.push(`/tour/${res.data.makeATour.data.slug}/edit/heading`)
            })
    }

    const inputHandler = (e) => {
        const target = e.target;

        setInput(p => ({
            ...p,
            [target.name]: target.value
        }))
    }

    return (
        <div className={classes.make}>
            {loading && <TopLoading />}
            <div className={classes.imageFrame}>
                <img src={t} className={classes.image} alt="tour demo"/>
                <div className={classes.title}>
                    <div className="row">
                        <h1>Earn money as a tour maker</h1>
                    </div>
                </div>
            </div>
            <div className={classes.makeWindow}>
                <h1 className={classes.mobileTitle}>Earn money as a tour maker</h1>
                <div className={classes.separator}>
                    <Separator color={'light'} margin={'1 2'}/>
                </div>
                    <form onSubmit={onMakeATour} className={classes.makeForm}>
                        <Input
                            type="text"
                            name="name"
                            placeholder="Tour Name"
                            onChange={inputHandler}/>
                        <Input
                            name={'difficulty'}
                            value={input.difficulty}
                            onChange={inputHandler}
                            options={difficultyOptions}/>
                        <Input
                            name={'maxGroupSize'}
                            value={input.maxGroupSize}
                            onChange={inputHandler}
                            options={maxGroupSizeOptions}/>

                        <StyledButton type={'submit'}>{loading ? <>Saving...</> : <>Get Started &#8594;</>}</StyledButton>
                    </form>
            </div>
        </div>
    )
}
export default Make