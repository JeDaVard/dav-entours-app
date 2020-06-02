import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../app/actions';
import classes from './LoginForm.module.css';
import AnimatedButton from '../../components/UI/AnimatedButton/AnimatedButton';
import Loading from '../../components/UI/Loading/Loading';
import Image from '../../components/UI/Image/Image';
import { generateBase64FromImage } from '../../utils/generateBase64FromImage';
import validator from "validator";
import { validateState } from "../../utils/validateState";
import AnimatedValidation from "../../components/UI/AnimatedValidation/AnimatedValidation";
import {Link} from "react-router-dom";


function LoginForm(props) {
    const [state, setState] = useState({
        input: {
            email: {
                value: '',
                valid: true,
            },
            password: {
                value: '',
                valid: true
            },
            name: {
                value: '',
                valid: true
            },
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
            updated[target.name].value = target.value;

            setState((state) => ({
                ...state,
                input: updated,
                isValid: false
            }));
        }
    };
    const authHandler = async (e, login) => {
        e.preventDefault();

        if (!login) {
            const validName = !state.input.name.value.match(/\d/)
                && state.input.name.value.trim().split(' ').length > 1;
            validateState(validName, 'name', setState);
        }

        props.auth({
            email: state.input.email.value.trim(),
            password: state.input.password.value,
            name: state.input.name.value ? state.input.name.value.trim() : '',
            image: state.input.image,
        }, login);
    };
    const continueHandler = async () => {
        const validEmail = validator.isEmail(state.input.email.value)
        validateState(validEmail, 'email', setState)

        const validPassword = validator.isByteLength(state.input.password.value, {min:8, max: undefined})
        validateState(validPassword, 'password', setState)

        if (validEmail && validPassword) {
            setState(state => ({
                ...state,
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
            <AnimatedButton button={true} type={'submit'}>
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
                onSubmit={(e) => authHandler(e, props.login)}
                className={classes.LoginForm}
            >
                <div className={classes.LoginForm__relative}>
                    <input
                        type="text"
                        name="name"
                        autoComplete={'name'}
                        placeholder={'Full Name'}
                        onChange={inputHandler}
                    />
                    <AnimatedValidation startCondition={!state.input.name.valid}>
                        Seems you entered an invalid full name
                    </AnimatedValidation>
                </div>
                <p className={classes.LoginForm__pText}>Choose your image by taping on default avatar down below</p>
                <div className={classes.LoginForm__preview}>
                    <div className={classes.LoginForm__user}>
                        <h2>
                            {state.input.name.value
                                ? state.input.name.value.split(' ')[0]
                                : 'Entours'}
                        </h2>
                        <div>
                            <label htmlFor="photo">
                                <div className={classes.LoginForm__image}>
                                    <Image
                                        url={
                                            state.input.image
                                                ? state.input.image
                                                : `${process.env.REACT_APP_SERVER}/images/user/default.jpg`
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
                        <Link to={loc => loc} onClick={props.onSignUp}>
                            Sign Up
                        </Link>
                    </p>
                ) : (
                    <p>
                        Already have account?&nbsp;
                        <Link to={loc => loc} onClick={props.onLogin}>
                            Login
                        </Link>
                    </p>
                )}
                {props.login && <Link to={loc => loc} >Forgot password?</Link>}
            </div>
            <form
                onSubmit={(e) => authHandler(e, props.login)}
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
                    <AnimatedValidation startCondition={!state.input.email.valid}>
                        You must enter a valid email address
                    </AnimatedValidation>
                    <input
                        type="password"
                        name="password"
                        autoComplete={'current-password'}
                        placeholder={'Password'}
                        onChange={inputHandler}
                    />
                    <AnimatedValidation startCondition={!state.input.password.valid}>
                        Password must have 8 or bigger length
                    </AnimatedValidation>
                    <AnimatedValidation startCondition={props.error}>
                        {props.error}
                    </AnimatedValidation>
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
    error: state.auth.error
});

const mapDispatchToProps = (dispatch) => ({
    auth: (data, login) => dispatch(actions.auth(data, login)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
