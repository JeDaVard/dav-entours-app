import React from "react";
import classes from './EditCover.module.css';
import classNames from 'classnames/bind';
import Justicon from "../../../components/UI/Justicon";
import ImageControls from "./ImageControls";
const cx = classNames.bind(classes);

export default function EditCover(props) {
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        imageCover,
        loading,
        removeImage,
        percent
    } = props;
    return (
        <div {...getRootProps({ className: classes.coverImage})}>
            <input {...getInputProps()} multiple={false} name="cover"/>
            <div className={cx(classes.coverImageFrame, {[classes.coverImageFrameActive]: isDragActive && !loading.images &&!loading.cover})}>
                {percent !== 0 && <div className="mainLoading" style={{transform: `scaleX(${1.02-percent/100})`}}/>}
                {imageCover ? (
                    <>
                        <img src={`${process.env.REACT_APP_CUN}/${imageCover}`}
                             className={classes.coverImagePreview}
                             alt=""/>
                        <ImageControls removeImage={removeImage} style={{top: '1.1rem', right: '1.1rem'}} />
                    </>
                ) : (
                    <div className={cx(classes.coverDragPlaceHolder, {[classes.coverDragPlaceHolderActive]: isDragActive && !loading.images &&!loading.cover})}>
                        <Justicon icon={'upload-cloud'}
                                  className={cx(classes.coverDragIcon, {[classes.coverDragIconActive]: loading.cover})}/>
                        <h2>Upload Main Image</h2>
                    </div>
                )}
            </div>

        </div>
    )
}