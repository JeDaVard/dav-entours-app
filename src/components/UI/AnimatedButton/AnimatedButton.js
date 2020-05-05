import React from 'react';
import classes from './AnimatedButton.module.css';

function AnimatedButton(props) {
    const handleButtonAnimation = function (e) {
        let x = e.nativeEvent.offsetX;
        let y = e.nativeEvent.offsetY;

        let ripples = document.createElement('span');
        ripples.style.left = x + 'px';
        ripples.style.top = y + 'px';

        e.target.appendChild(ripples);

        // Function
        props.fn && props.fn();

        setTimeout(() => {
            ripples.remove();
        }, 1200);
    };
    return (
        <>
            {props.button ? (
                <button
                    onClick={handleButtonAnimation}
                    className={classes.AnimatedButton}
                >
                    {props.children}
                </button>
            ) : (
                <a
                    href="#"
                    type={'submit'}
                    onClick={handleButtonAnimation}
                    className={classes.AnimatedButton}
                >
                    {props.children}
                </a>
            )}
        </>
    );
}

export default AnimatedButton;
