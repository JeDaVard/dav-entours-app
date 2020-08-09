import React from "react";
import classes from './MobileSearch.module.css';
import { useQuery } from "@apollo/client";
import { FETCH_RECOMMENDED } from "../SearchResults/queries";
import Recommended from "../Search/Recommended";
import MainHead from "../MainPage/MainHead/MainHead";
import ThumbedImage from "../../components/UI/ImageLoading/ThumbedImage";

export default function MobileSearch() {
    const { loading, error, data} = useQuery(FETCH_RECOMMENDED)
    return (
        <div>
            {/*<MainHead />*/}
            <div className={classes.topPlaceHolder}/>
            <div className={classes.container}>
                {data && !!data.recommended.length && data.recommended.slice(0,4).map(rec => (
                    <div className={classes.tour}>
                        <div className={classes.imageFrame}>
                            <ThumbedImage src={rec.imageCover} className={classes.image} alt={rec.name}/>
                        </div>
                    </div>
                ))}
            </div>
            <div className={classes.recommended}>
                {data && !!data.recommended.length && (
                    <Recommended tours={data.recommended.slice(4,8)}/>
                )}
            </div>
        </div>
    )
}