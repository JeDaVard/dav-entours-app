import React, {useCallback, useEffect, useState} from "react";
import { connect } from "react-redux";
import classes from './EditGallery.module.css'
import {Form} from "../../../components/UI/LabeledInput/LabeledInput";
import SimpleMobileTop from "../SimpleMobileTop";
import StyledButton from "../../../components/UI/StyledButton/StyledButton";
import {useMutation} from "@apollo/react-hooks";
import {EDIT_TOUR_GALLERY, FETCH_EDIT_TOUR, UPLOAD_IMAGE} from "../queries";
import {useDropzone} from "react-dropzone";
import Justicon from "../../../components/UI/Justicon";
import classNames from 'classnames/bind'
import {loadingOff, loadingOn} from "../../../app/actions";
const cx = classNames.bind(classes)

function EditGallery(props) {
    const { imageCover } = props;
    const images = props.images;
    
    const [ signURL ] = useMutation(UPLOAD_IMAGE);
    const [ loading, setLoading ] = useState({
        cover: false,
        images: false
    });

    const [ mutateGallery] = useMutation(EDIT_TOUR_GALLERY);

    const onCoverDrop = useCallback(async ([file]) => {
        if (loading.images || loading.cover) return;
        setLoading(s => ({...s, cover: true}))
        const res = await signURL({
            variables: { fileName: `main_${Date.now()}.jpg`, contentType: file.type, id: props._id, }
        });

        const { key, url } = res.data.uploadImage;

        await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': file.type
            },
            body: file,
        })

        const dbRes = await mutateGallery({
            variables: {
                id: props._id,
                removeImage: imageCover,
                imageCover: key,
                images: images
            }
        })
        setLoading(s => ({...s, cover: false}))
    }, [loading.cover, loading.images, imageCover, images])

    const onImageDrop = useCallback( async ([file]) => {
        if (loading.images || loading.cover) return;
        setLoading(s => ({...s, images: true}))
        const res = await signURL({
            variables: { fileName: `image_${Date.now()}.jpg`, contentType: file.type, id: props._id, }
        });

        const { key, url } = res.data.uploadImage;

        await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': file.type
            },
            body: file,
        })

        const dbRes = await mutateGallery({
            variables: {
                id: props._id,
                removeCover: null,
                imageCover: imageCover,
                images: images.length ? [...images, key] : [ key ]
            }
        })

        setLoading(s => ({...s, images: false}))

    }, [loading.images, loading.cover, images, imageCover]);


    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: onCoverDrop});
    const { getRootProps: GRP, getInputProps: GIP, isDragActive: iDA } = useDropzone({ onDrop:onImageDrop });

    const buttonText = props.draft ? <>Save & Next &#8594;</> : <>Save &#10003;</>
    const submissionUI = props.isMobile ? (
        <SimpleMobileTop
            to={props.draft ? `/mytours?tab=draft` : `/mytours`}
            button={props.draft ? 'Next' : 'Done'}
            type={'submit'}
            icon={props.draft ? 'chevron-right' : 'check'}
            children={'Gallery'}
            loading={loading.images || loading.cover}
            disabled={props.draft ? false : (!loading.images && !loading.cover)}
            top
            shadow
            fixed
        />
    ) : (
        <div className={classes.button}>
            <StyledButton type={'submit'}>{props.reduxLoading ? <>Saving...</> : buttonText}</StyledButton>
        </div>
    );

    const removeImage = useCallback(async (e, removeImage) => {
        e.stopPropagation();
        e.preventDefault();

        await mutateGallery({
            variables: {
                id: props._id,
                removeImage: removeImage || imageCover,
                imageCover: removeImage ? imageCover : null,
                images: removeImage ? images.filter(image => image !== removeImage) : images
            }
        })
    }, [imageCover, images]);

    return (
        <div className="row">
            <form onSubmit={(e) => {}} className={classes.uploadForm}>
                <div {...getRootProps({ className: classes.coverImage})}>
                    <input {...getInputProps()} multiple={false} name="cover"/>
                    <div className={cx(classes.coverImageFrame, {[classes.coverImageFrameActive]: isDragActive && !loading.images &&!loading.cover})}>
                        {imageCover ? (
                            <>
                                <img src={`${process.env.REACT_APP_CDN}/${imageCover}`}
                                     className={classes.coverImagePreview}
                                     alt=""/>
                                <div className={classes.controls} style={{top: '2rem', right: '2rem'}}>
                                    <button onClick={e => removeImage(e)}>
                                        <Justicon icon={'trash'} className={classes.controlIcon}/>
                                    </button>
                                </div>
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

                <div {...GRP({className: classes.images})} >
                    <input {...GIP()} multiple={false} name="images"/>
                    <div className={classes.imagesFrame}>
                        <div className={cx(classes.containerDrag, {[classes.containerDragActive]: iDA && !loading.images &&!loading.cover})}>
                            <div className={cx(classes.contentDrag, {[classes.contentDragActive]: iDA && !loading.images &&!loading.cover})}>
                                    <Justicon icon={'upload-cloud'}
                                              className={cx(classes.imagesDragIcon, {[classes.imagesDragIconActive]: loading.images})}/>
                                    <h2>Photos</h2>
                            </div>
                        </div>
                        {images.map(image => (
                                <div className={cx(classes.container, {[classes.containerActive]: iDA && !loading.images &&!loading.cover})}
                                     key={image}>
                                    <div className={classes.content}>
                                        <img src={`${process.env.REACT_APP_CDN}/${image}`}
                                             className={classes.imagesPreview}
                                             alt=""/>
                                        <div className={classes.controls}>
                                            <button onClick={e => removeImage(e, image)}>
                                                <Justicon icon={'trash'} className={classes.controlIcon}/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>


                </div>
                    {submissionUI}
            </form>
        </div>
    )
}

const mSTP = s => ({
    isMobile: s.ui.display.isMobile,
})

export default connect(mSTP)(EditGallery)