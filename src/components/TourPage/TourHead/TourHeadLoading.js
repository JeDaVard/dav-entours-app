import React from 'react';
import classes from './TourHead.module.css';
import '../animation.css';
import Justicon from "../../UI/Justicon";
import ContentLoader from "react-content-loader";

function TourHeadLoading() {
    return (
        <div className={classes.TourHead__cover}>
            <div className={classes.TourHead__coverImage} style={{ background: 'rgba(0,0,0, .3'}} />

            <div className={'row'}>
                <div className={classes.TourHead__shareBox}>
                    <div className={classes.TourHead__share}>
                        <Justicon icon={'upload'} className={classes.TourHead__shareIcon}/>
                        <b>Share</b>
                    </div>
                    <div className={classes.TourHead__share}>
                        <Justicon icon={'heart'} className={classes.TourHead__shareIcon}/>
                        <b>Save</b>
                    </div>
                  </div>
                <div className={classes.TourHead}>
                    <div className={classes.TourHead__left}>
                        <ContentLoader
                            height={130}
                            width={500}
                            speed={.5}
                            gradientRatio={1}
                            backgroundColor={'#f1f1f1'}
                            foregroundColor={'#f8f8f8'}
                            // viewBox="0 0 400 310"
                        >
                            <rect x="0" y="0" rx="3" ry="3" width="80" height="26" />
                            <rect x="88" y="0" rx="3" ry="3" width="80" height="26" />
                            <rect x="0" y="42" rx="3" ry="3" width="400" height="46" />
                            <rect x="0" y="106" rx="3" ry="3" width="160" height="24" />
                        </ContentLoader>
                    </div>
                </div>
                <div className={classes.TourHead__bottom}>
                    <h3>
                        <ContentLoader
                            height={50}
                            width={200}
                            speed={0.5}
                            gradientRatio={1}
                            backgroundColor={'#f1f1f1'}
                            foregroundColor={'#f8f8f8'}
                            // viewBox="0 0 400 310"
                        >
                            <rect x="0" y="6" rx="3" ry="3" width="200" height="20" />
                            <rect x="0" y="30" rx="3" ry="3" width="200" height="20" />
                        </ContentLoader>
                    </h3>
                    <div className={classes.TourHead__info}>
                        <ContentLoader
                            height={50}
                            width={500}
                            speed={0.5}
                            gradientRatio={1}
                            backgroundColor={'#f1f1f1'}
                            foregroundColor={'#f8f8f8'}
                            // viewBox="0 0 400 310"
                        >
                            <rect x="0" y="0" rx="3" ry="3" width="160" height="50" />
                            <rect x="170" y="0" rx="3" ry="3" width="160" height="50" />
                            <rect x="340" y="0" rx="3" ry="3" width="160" height="50" />
                        </ContentLoader>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TourHeadLoading
