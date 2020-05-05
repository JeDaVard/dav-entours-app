import React from 'react';
import classes from './LoginForm.module.css';
import AnimatedButton from "../UI/AnimatedButton/AnimatedButton";

function LoginForm(props) {
    const loginForm = (
        <div>
            <div className={classes.LoginForm__options}>
                <a href="/sign-up">Forgot password?</a>
                <p>
                    Not registered? <a href="#" onClick={props.onSignUp}>Sign Up</a>
                </p>
            </div>
            <form onSubmit={() => alert('hello')} className={classes.LoginForm}>
                <div className={classes.LoginForm__relative}>
                    {/*<label htmlFor="email">E-mail</label>*/}
                    <input type="email" name="email" placeholder={'E-mail'} />
                    {/*<label htmlFor="password">Password</label>*/}
                    <input
                        type="password"
                        name="password"
                        placeholder={'Password'}
                    />
                </div>
                <AnimatedButton>Login</AnimatedButton>
            </form>
        </div>
    )
    const signUpForm = (
        <div>
            <div className={classes.LoginForm__options}>
                <a href="/sign-up">Forgot password?</a>
                <p>
                    Have an account? <a href="#" onClick={props.onLogin}>Login</a>
                </p>
            </div>
            <form onSubmit={() => alert('hello')} className={classes.LoginForm}>
                <div className={classes.LoginForm__relative}>
                    <input type="text" name="name" placeholder={'Full name'} />
                    <input type="email" name="email" placeholder={'E-mail'} />
                    <input
                        type="password"
                        name="password"
                        placeholder={'Password'}
                    />
                </div>
                <AnimatedButton>Sign Up</AnimatedButton>
            </form>
        </div>
    )
    return (
        <>
            {props.login ? loginForm : signUpForm}
        </>
    );
}

export default LoginForm;
