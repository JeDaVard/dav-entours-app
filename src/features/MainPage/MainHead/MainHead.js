import React, {useRef} from "react";
import classes from './MainHead.module.css';
import TopSearchMobile from "../../../components/TopSearchMobile/TopSearchMobile";
import Search from "../Search/Search";
import mainImg from '../../../assets/img/main.jpg'
import useScrollTrigger from "../../../hooks/useScrollTrigger";
import Navigation from "../Navigation/Navigation";
import {CSSTransition} from "react-transition-group";

export default function MainHead(props) {
    const [ trigger, setTrigger ] = useScrollTrigger({changePoint: 10})
    const ref = useRef(null);

    return (
        <div className={classes.MainHead}>
                <img src={mainImg} className={classes.mainImg} alt="entours main"/>
            <div>
            </div>
            <div className={classes.search}>
                {props.isMobile ? <TopSearchMobile /> : (
                    <CSSTransition
                        nodeRef={ref}
                        in={!trigger}
                        timeout={100}
                        classNames="bigSearch"
                        unmountOnExit
                    >
                        <div className={classes.bigSearch} ref={ref}>
                            <div className={classes.navigation}>
                                <Navigation />
                            </div>
                            <div className={classes.container}>
                                <Search />
                            </div>
                        </div>
                    </CSSTransition>
                )}
            </div>
        </div>
    )
}