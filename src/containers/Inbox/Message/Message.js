import React from "react";
import classes from './Message.module.css';
import userImage from "../img.jpeg";

function Message(props) {

    return (
        <div className={`${classes.Message} ${props.own && classes.Message__own}`}>
            <div className={`${classes.Message__author} ${props.own && classes.Message__authorOwn}`}>
                <img src={userImage} alt=""/>
            </div>
            <div className={`${classes.Message__text} ${props.own && classes.Message__textOwn}`}>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur dolore est eum harum hic illo laborum officia, placeat quae quaerat, quod reiciendis reprehenderit voluptatum! Beatae culpa explicabo minima necessitatibus quod.
                </p>
                {/*<p>ghj hjk</p>*/}
                <h4>Sat, 12 Jun 2020</h4>
            </div>
        </div>
    )
}

export default Message