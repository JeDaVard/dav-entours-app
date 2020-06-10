import React from "react";
import {Link} from "react-router-dom";
import classes from './NavButton.module.css'
import Justicon from "../../../../components/UI/Justicon";


function NavButton({forward, to}) {
    return (
        <Link to={to}>
            <Justicon icon={forward ? 'chevron-right' : 'chevron-left'} className={classes.NavButton}/>
        </Link>
    )
}

export default NavButton