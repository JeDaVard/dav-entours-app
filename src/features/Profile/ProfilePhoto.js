import React, {useState} from "react";
import { useHistory } from 'react-router-dom';
import classes from './ProfilePhoto.module.css';
import Image from "../../components/UI/Image/Image";
import SimpleButton from "../../components/UI/SimpleButton/SimpleButton";
import {useDispatch} from "react-redux";
import {FINISH_PROFILE_PHOTO} from "../../app/actions/ui/types";

export default function ProfilePhoto(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const { name } = props;

    const [ input, setInput ] = useState({photo: null});

    const changeHandler = (e) => {
        const target = e.target;
        setInput(p => ({...p, photo: target.files[0]}))
    }

    console.log(input)

    const navHandler = (e, dir) => {
        e.preventDefault();

        dispatch({type: FINISH_PROFILE_PHOTO});
        history.push(dir)
    }
    return (
        <div>
            <form
                onSubmit={() => {}}
                className={classes.NexUp}>
                <h2 className={classes.success}>You are successfully Signed Up</h2>
                <p className={classes.pText}>Choose your image by taping on default avatar down below</p>
                <div className={classes.preview}>
                    <div className={classes.user}>
                        <h2>{name}</h2>
                        <div>
                            <label htmlFor="photo">
                                <div className={classes.image}>
                                    <Image
                                        url={`${process.env.REACT_APP_SERVER}/images/user/default.svg`}
                                    />{' '}
                                </div>
                            </label>
                            <input
                                type="file"
                                name="photo"
                                id="photo"
                                accept='.jpeg, .jpg, .png, .JPEG, .JPG, .PNG'
                                onChange={changeHandler}
                                className={classes.fileInput}
                            />
                        </div>
                    </div>
                </div>
                <p className={classes.pText}>You automatically accept our <a href="/policy">Policies</a> by signing up</p>
                <div className={classes.upButtons}>
                    <SimpleButton onClick={e => navHandler(e, '/make')} primary>
                        Start making a tour
                    </SimpleButton >
                    <SimpleButton onClick={e => navHandler(e, '/')} primary>
                        Discover the planet
                    </SimpleButton >
                </div>
            </form>
        </div>
    )
}