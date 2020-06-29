import React from 'react';
import classes from './TourHead.module.css';
import '../animation.css';
import Justicon from "../../UI/Justicon";
import ContentLoader from "react-content-loader";

function TourHeadLoadingMobile() {
    return (
        <div className={classes.cover}>
            <div className={classes.coverImage} style={{ background: 'rgba(0,0,0, .3'}} />

            <div className={'row'}>
                <div className={classes.shareBox}>
                    <div className={classes.share}>
                        <Justicon icon={'upload'} className={classes.shareIcon}/>
                        <b>Share</b>
                    </div>
                    <div className={classes.share}>
                        <Justicon icon={'heart'} className={classes.shareIcon}/>
                        <b>Save</b>
                    </div>
                </div>
                <div className={classes.TourHead}>
                    <div className={classes.left}>
                        <ContentLoader
                            height={190}
                            width={300}
                            speed={.5}
                            gradientRatio={1}
                            backgroundColor={'#d0d0d0'}
                            foregroundColor={'#d7d7d7'}
                            // viewBox="0 0 400 310"
                        >
                            <rect x="70" y="0" rx="3" ry="3" width="70" height="26" />
                            <rect x="158" y="0" rx="3" ry="3" width="70" height="26" />
                            <rect x="0" y="42" rx="3" ry="3" width="300" height="106" />
                            <rect x="70" y="166" rx="3" ry="3" width="160" height="24" />
                        </ContentLoader>
                    </div>
                </div>
                <div className={classes.bottom}>
                    <h3>
                        <ContentLoader
                            height={86}
                            width={150}
                            speed={0.5}
                            gradientRatio={1}
                            backgroundColor={'#d0d0d0'}
                            foregroundColor={'#d7d7d7'}
                            // viewBox="0 0 400 310"
                        >
                            <rect x="0" y="6" rx="3" ry="3" width="150" height="20" />
                            <rect x="0" y="36" rx="3" ry="3" width="150" height="20" />
                            <rect x="0" y="66" rx="3" ry="3" width="150" height="20" />
                        </ContentLoader>
                    </h3>
                    <div className={classes.info}>
                        <ContentLoader
                            height={86}
                            width={150}
                            speed={0.5}
                            gradientRatio={1}
                            backgroundColor={'#d0d0d0'}
                            foregroundColor={'#d7d7d7'}
                            // viewBox="0 0 400 310"
                        >
                            <rect x="0" y="0" rx="3" ry="3" width="150" height="86" />
                            {/*<rect x="0" y="0" rx="3" ry="3" width="200" height="40" />*/}
                            {/*<rect x="0" y="0" rx="3" ry="3" width="200" height="40" />*/}
                        </ContentLoader>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TourHeadLoadingMobile
