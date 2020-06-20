import React from "react";
import classes from "./Locations.module.css";
import Justicon from "../../UI/Justicon";

function Locations(props) {
    return (
        <div className={classes.locList}>
            <div className="row">
                <div><h3>Tour Locations</h3></div>
                <div className={classes.locations}>
                    {props.data.locations.map(loc => (
                        <div
                            key={loc.description}
                            className={classes.locListItemBlock}
                        >
                            <div className={classes.locListItem}
                                 onClick={() => props.viewportHandler(loc.coordinates[1], loc.coordinates[0])}
                            >
                                <div className={classes.locItem}>
                                    <Justicon icon={'map-pin'} className={classes.locIcon}/>
                                    <div className={classes.locListButton} >
                                        {loc.description}
                                    </div>
                                </div>
                            </div>
                            <p className={classes.locationDesc}>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aperiam, assumenda beatae blanditiis dolore ducimus fugit inventore labore modi molestiae nostrum odio omnis praesentium, quasi quia rerum tempora voluptas voluptatem!
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Locations