import React from "react";
import classes from './EditImages.module.css';
import classNames from 'classnames/bind'
import Justicon from "../../../components/UI/Justicon";
import ImageControls from "./ImageControls";
const cx = classNames.bind(classes)

export default function EditImages(props) {
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        loading,
        images,
        removeImage
    } = props;

    return (
        <div {...getRootProps({className: classes.images})} >
            <input {...getInputProps()} multiple={false} name="images"/>
            <div className={classes.imagesFrame}>
                <div className={classes.containerDrag}>
                    <div className={cx(classes.contentDrag, {[classes.contentDragActive]: isDragActive && !loading.images &&!loading.cover})}>
                        <Justicon icon={'upload-cloud'}
                                  className={cx(classes.imagesDragIcon, {[classes.imagesDragIconActive]: loading.images})}/>
                        <h2>Photos</h2>
                    </div>
                </div>
                {images.map(image => (
                    <div className={cx(classes.container, {[classes.containerActive]: isDragActive && !loading.images &&!loading.cover})}
                         key={image}>
                        <div className={classes.content}>
                            <img src={`${process.env.REACT_APP_CUN}/${image}`}
                                 className={classes.imagesPreview}
                                 alt=""/>
                            <ImageControls removeImage={removeImage} imageLink={image}/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}