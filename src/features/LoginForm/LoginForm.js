import React, { useState } from 'react';
import classes from './LoginForm.module.css';
import AnimatedButton from '../../components/UI/AnimatedButton/AnimatedButton';
import Loading from '../../components/UI/Loading/Loading';
import Image from '../../components/UI/Image/Image';
import { generateBase64FromImage } from '../../utils/generateBase64FromImage';
import validator from "validator";
import { validateState } from "../../utils/validateState";
import AnimatedValidation from "../../components/UI/AnimatedValidation/AnimatedValidation";
import { Link } from "react-router-dom";
import { useApolloClient, useMutation } from '@apollo/client';
import { SIGN_IN, SIGN_UP } from "./queries";
import {setCookie} from "../../utils/cookies";
import {gql} from "@apollo/client";
import NextUp from "./NextUp";

function LoginForm(props) {
    const client = useApolloClient();
    const [state, setState] = useState({
        input: {
            email: {
                value: '',
                valid: true,
                message: '',
            },
            password: {
                value: '',
                valid: true,
                message: ''
            },
            name: {
                value: '',
                valid: true,
                message: ''
            },
        },
        nextUp: false,
        isValid: false,
    });

    const [sign, { loading }] = useMutation(props.login ? SIGN_IN : SIGN_UP, {
        onCompleted({ login }) {
            client.writeQuery({
                query: gql`
					query {
						loggedIn
						photo
						name
						userId
					}
                `,
                data: {
                    loggedIn: true,
                    photo: login.photo,
                    name: login.name,
                    userId: login._id
                }
            });

            setCookie('userId', login._id, Date.now() + +process.env.REACT_APP_AUTH_EXP)
            localStorage.setItem('photo', login.photo);
            localStorage.setItem('name', login.name);
        },
        onError(e) {
            console.log(e)
            if (e.errors[0].message.includes('E11000')) {
                validateState(false,
                    'email', setState,
                    'This E-mail is already registered')
            } else {
                validateState(false,
                    'password', setState,
                    'Incorrect password')
            }
        }
    });

    const inputHandler = (e) => {
        const target = e.target;
        const updated = { ...state.input };
        updated[target.name].value = target.value;

        setState((state) => ({
            ...state,
            input: updated,
            isValid: false
        }));
    };

    const authHandler = (e, login) => {
        e.preventDefault();

        if (login) {
            if (!continueHandler(login)) return;

            sign({
                variables: {
                    email: state.input.email.value.trim(),
                    password: state.input.password.value,
                }
            }).then(r=>console.log).catch(e=>console.log)
        }

        if (!login) {
            if (!continueHandler()) return;
            sign({
                variables: {
                    email: state.input.email.value.trim(),
                    password: state.input.password.value,
                    name: state.input.name.value ? state.input.name.value.trim() : '',
                }
            }).then(r=> {
                setState(state => ({ ...state, nextUp: true }))
                console.log(r)
            }).catch(e=>console.log)
        }
    }
    const continueHandler = login => {
        const validEmail = validator.isEmail(state.input.email.value)
        validateState(validEmail, 'email', setState, 'You must enter a valid email address')

        const validPassword = validator.isByteLength(state.input.password.value, {min:8, max: undefined})
        validateState(validPassword,
            'password', setState,
            'Password must have 8 or bigger length')

        let validName = true;
        if (!login) {
            validName = !state.input.name.value.match(/\d/)
                && state.input.name.value.trim().split(' ').length > 1;
            validateState(validName,
                'name',setState,
                'Seems you entered an invalid full name');
        }

        return login ? validEmail && validPassword
            : validEmail && validName && validPassword
    };

    const form = (
        <div hidden={state.nextUp}>
            <div className={classes.options}>
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
                <div className={classes.relative}>
                    <input
                        type="email"
                        name="email"
                        autoComplete={'email'}
                        placeholder={'E-mail'}
                        onChange={inputHandler}
                    />
                    <AnimatedValidation startCondition={!state.input.email.valid}>
                        {state.input.email.message}
                    </AnimatedValidation>
                    {!props.login && (
                        <>
                            <input
                                type="text"
                                name="name"
                                autoComplete={'name'}
                                placeholder={'Full Name'}
                                onChange={inputHandler}
                            />
                            <AnimatedValidation startCondition={!state.input.name.valid}>
                                {state.input.name.message}
                            </AnimatedValidation>
                        </>
                    )}
                    <input
                        type="password"
                        name="password"
                        autoComplete={'current-password'}
                        placeholder={'Password'}
                        onChange={inputHandler}
                    />
                    <AnimatedValidation startCondition={!state.input.password.valid}>
                        {state.input.password.message}
                    </AnimatedValidation>
                    <AnimatedValidation startCondition={props.error}>
                        {props.error}
                    </AnimatedValidation>
                </div>
                {props.loading ? (
                    <Loading white button/>
                ) : (
                    <AnimatedButton button type={'submit'} disabled={loading}>
                        {!loading && props.login ? <>Login &#8594;</> : <>Sign Up &#8594;</>}
                        {loading && ' '}
                    </AnimatedButton>
                )}
            </form>
        </div>
    )
    return (
        <>
            {form}
            {state.nextUp && <NextUp
                                     name={
                                            state.input.name.value
                                            ? state.input.name.value.split(' ')[0]
                                            : 'Entours'
                                    } />}
        </>
    );
}

export default LoginForm;

