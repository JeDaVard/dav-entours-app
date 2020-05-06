import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../app/actions';
import classes from './LoginForm.module.css';
import AnimatedButton from '../../components/UI/AnimatedButton/AnimatedButton';
import Loading from '../../components/UI/Loading/Loading';
import Image from '../../components/UI/Image/Image';
import Separator from '../../components/UI/Separator/Separator';
import user from '../../components/Topbar/Navigation/user.jpg';
import { generateBase64FromImage } from '../../utils/generateBase64FromImage';
import validator from "validator";

function LoginForm(props) {
    const [state, setState] = useState({
        input: {
            email: '',
            password: '',
            name: '',
            image: null,
        },
        nextUp: false,
        isValid: false
    });

    const inputHandler = (e) => {
        const target = e.target;
        if (target.files && target.name === 'photo') {
            generateBase64FromImage(target.files[0])
                .then((b64) => {
                    setState((state) => ({
                        ...state,
                        input: {
                            ...state.input,
                            image: b64,
                        },
                    }));
                })
                .catch((e) => {
                    setState((state) => ({
                        ...state,
                        input: {
                            ...state.input,
                            image: null,
                        },
                    }));
                });
        } else {
            const updated = { ...state.input };
            updated[target.name] = target.value;

            setState((state) => ({
                ...state,
                input: updated,
                isValid: false
            }));
        }
    };
    const authHandler = async (e) => {
        e.preventDefault();

        props.login
            ? props.auth({
                  email: state.input.email,
                  password: state.input.password,
              })
            : props.auth({
                  email: state.input.email,
                  password: state.input.password,
              });
    };
    const continueHandler = () => {
        const validEmail = validator.isEmail(state.input.email)
        const validPassword = validator.isByteLength(state.input.password, {min:6, max: undefined})
        if (validEmail && validPassword) {
            setState(state => ({
                ...state,
                isValid: true,
                nextUp: true
            }))
        }
    };
    const backHandler = () => {
        setState(state => ({
            ...state,
            nextUp: false
        }))
    };

    const formButton = props.login
        ? (
        <AnimatedButton button={true} type={'submit'} prevent>
            Login &#8594;
        </AnimatedButton>
        ) : (
            <AnimatedButton button={true} fn={continueHandler} prevent>
            Continue &#8594;
        </AnimatedButton>
        )
    const nextUp = (
        <div hidden={!state.nextUp}>
            <div style={{marginBottom: '2rem'}}>
                <AnimatedButton button fn={backHandler} prevent>
                    &#8592; Back
                </AnimatedButton>
            </div>
            <form
                onSubmit={(e) => authHandler(e)}
                className={classes.LoginForm}
            >
                <input
                    type="text"
                    name="name"
                    autoComplete={'name'}
                    placeholder={'Full Name'}
                    onChange={inputHandler}
                />
                <p className={classes.LoginForm__pText}>Choose your image by taping on default avatar down below</p>
                <div className={classes.LoginForm__preview}>
                    <div className={classes.LoginForm__user}>
                        <h2>
                            {state.input.name
                                ? state.input.name.split(' ')[0]
                                : 'Entours'}
                        </h2>
                        <div>
                            <label htmlFor="photo">
                                <div className={classes.LoginForm__image}>
                                    <Image
                                        url={
                                            state.input.image
                                                ? state.input.image
                                                : 'http://localhost:5000/images/user/default.jpg'
                                        }
                                    />{' '}
                                </div>
                            </label>
                            <input
                                type="file"
                                name="photo"
                                id="photo"
                                onChange={inputHandler}
                                className={classes.LoginForm__fileInput}
                            />
                        </div>
                    </div>
                </div>
                <p className={classes.LoginForm__pText}>You automatically accept our <a href="/policy">Policies</a> by signing up</p>
                {props.loading ? (
                    <Loading white button/>
                ) : (
                    <AnimatedButton button={true} type={'submit'}>
                        Sign Up &#8594;
                    </AnimatedButton>
                )}
            </form>
        </div>
    );

    const form = (
        <div hidden={state.nextUp}>
            <div className={classes.LoginForm__options}>
                {props.login ? (
                    <p>
                        Not registered?&nbsp;
                        <a href="/#" onClick={props.onSignUp}>
                            Sign Up
                        </a>
                    </p>
                ) : (
                    <p>
                        Already have account?&nbsp;
                        <a href="/#" onClick={props.onLogin}>
                            Login
                        </a>
                    </p>
                )}
                {props.login && <a href="/sign-up">Forgot password?</a>}
            </div>
            <form
                onSubmit={(e) => authHandler(e)}
                className={classes.LoginForm}
            >
                <div className={classes.LoginForm__relative}>
                    <input
                        type="email"
                        name="email"
                        autoComplete={'email'}
                        placeholder={'E-mail'}
                        onChange={inputHandler}
                    />
                    <input
                        type="password"
                        name="password"
                        autoComplete={'current-password'}
                        placeholder={'Password'}
                        onChange={inputHandler}
                    />
                </div>
                {props.loading ? (
                    <Loading white button/>
                ) : (
                    formButton
                )}
            </form>
        </div>
    )
    return (
        <>
            {form}
            {nextUp}
        </>
    );
}

const mapStateToProps = (state) => ({
    loading: state.auth.loading,
});

const mapDispatchToProps = (dispatch) => ({
    auth: (data) => dispatch(actions.auth(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
