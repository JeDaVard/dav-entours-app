import React from "react";
import classes from './NextUp.module.css';
import Image from "../../components/UI/Image/Image";
import Loading from "../../components/UI/Loading/Loading";
import AnimatedButton from "../../components/UI/AnimatedButton/AnimatedButton";

export default function NextUp(props) {
    const { name } = props;

    return (
        <div>
            <form
                onSubmit={() => {}}
                className={classes.NexUp}
            >
                <h2 className={classes.success}>You are successfully Signed Up</h2>
                <p className={classes.pText}>Choose your image by taping on default avatar down below</p>
                <div className={classes.preview}>
                    <div className={classes.user}>
                        <h2>
                            {name}
                        </h2>
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
                                onChange={() => {}}
                                className={classes.fileInput}
                            />
                        </div>
                    </div>
                </div>
                <p className={classes.pText}>You automatically accept our <a href="/policy">Policies</a> by signing up</p>
                {props.loading ? (
                    <Loading white button/>
                ) : (
                    <AnimatedButton button={true} type={'submit'}>
                        Finish &#10003;
                    </AnimatedButton>
                )}
            </form>
        </div>
    )
}