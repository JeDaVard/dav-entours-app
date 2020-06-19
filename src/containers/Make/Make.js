import React, {useState} from "react";
import classes from './Make.module.css';
import t from './1-1.jpg'
import StyledButton from "../../components/UI/StyledButton/StyledButton";
import Separator from "../../components/UI/Separator/Separator";
import Input from "../../components/UI/Input/Input";

function Make() {
    const [ input, setInput ] = useState({
        title: '',
        difficulty: 'easy',
        maxSize: 2,
    })

    const inputHandler = (e) => {
        const target = e.target;

        setInput(p => ({
            ...p,
            [target.name]: target.value
        }))
    }

    return (
        <div className={classes.make}>
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
                    <form action="" className={classes.makeForm}>
                        <Input type="text" name="title" placeholder="Tour Title" onChange={inputHandler}/>
                        <Input name={'difficulty'} value={input.difficulty} onChange={inputHandler} options={[{value: 'easy', name: 'Difficulty level: Easy'}, {value: 'hard', name: 'Difficulty level: Hard'}]}/>
                        <Input name={'maxSize'} value={input.maxSize} onChange={inputHandler} options={[{value: 1, name: 'Group Size: 1'}, {value: 2, name: 'Group Size: 2'}]}/>

                        <StyledButton type={'submit'}>Get Started &#8594;</StyledButton>
                    </form>
            </div>
            <div>
                some fancy info
            </div>
        </div>
    )
}

export default Make