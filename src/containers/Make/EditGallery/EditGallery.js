import React, {useCallback, useEffect, useState} from "react";
import { connect } from "react-redux";
import classes from './EditGallery.module.css'
import {Form} from "../../../components/UI/LabeledInput/LabeledInput";
import SimpleMobileTop from "../SimpleMobileTop";
import StyledButton from "../../../components/UI/StyledButton/StyledButton";
import {useMutation} from "@apollo/react-hooks";
import {EDIT_TOUR_GALLERY, UPLOAD_IMAGE} from "../queries";
import {useDropzone} from "react-dropzone";
import Justicon from "../../../components/UI/Justicon";
import classNames from 'classnames/bind'
const cx = classNames.bind(classes)

function EditGallery(props) {
    const initialCover = props.imageCover
        ? { data: null, preview: `${process.env.REACT_APP_SERVER}/images/tour/${props.imageCover}` }
        : { data: null, preview: '' };

    const initialImages = props.images.length
        ? props.images.map(image => ({data: null, preview: `${process.env.REACT_APP_SERVER}/images/tour/${image}`}))
        : [];

    const [ cover, setCover ] = useState(initialCover);

    const [ images, setImages ] = useState(initialImages);

    const [ mutateEditGallery, { loading } ] = useMutation(UPLOAD_IMAGE, {
        variables: { file: cover, id: props._id, }
    });

    const onEditGallery = async (e) => {
        e.preventDefault();

        const res = await mutateEditGallery()
        const key = res.data.uploadImage.key;
        const url = res.data.uploadImage.url

        await fetch(url, {
            method: 'PUT',
            headers: {
              'Content-Type': 'image/jpeg'
            },
            body: cover,
        })
        console.log(key)
    }
    const onCoverDrop = useCallback(([file]) => {
        setCover({ data: file, preview: URL.createObjectURL(file)})
    }, [])

    const onImageDrop = useCallback( (images) => {
    const newImages = images.map(file => Object.assign({data: file}, {
        preview: URL.createObjectURL(file)
    }))
        setImages(state => [
            ...newImages,
            ...state
        ]);
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: onCoverDrop });
    const { getRootProps: GRP, getInputProps: GIP, isDragActive: iDA } = useDropzone({ onDrop:onImageDrop });

    const buttonText = props.draft ? <>Save & Next &#8594;</> : <>Save &#10003;</>
    const submissionUI = props.isMobile ? (
        <SimpleMobileTop
            to={`/tour/${props.slug}/edit/heading`}
            button={props.draft ? 'Next' : 'Save'}
            type={'submit'}
            icon={props.draft ? 'chevron-right' : 'check'}
            children={'Gallery'}
            loading={loading}
            top
            shadow
            fixed
        />
    ) : (
        <div className={classes.button}>
            <StyledButton type={'submit'}>{loading ? <>Saving...</> : buttonText}</StyledButton>
        </div>
    );

    // const onFile = (e) => {
    //     const file = e.target.files[0]
    //     setFile(file)
    // }
    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        URL.revokeObjectURL(cover.preview)
    }, [cover]);

    return (
        <div className="row">
            <div className={classes.uploadForm}>
                <div {...getRootProps({ className: classes.coverImage})} >
                    <input {...getInputProps()}/>
                    <div className={classes.coverImageFrame}>
                        {cover.preview ? (
                            <>
                                <img src={cover.preview}
                                     className={classes.coverImagePreview}
                                     alt=""/>
                                <div className={classes.controls} style={{top: '2rem', right: '2rem'}}>
                                    <button onClick={e => {e.stopPropagation(); e.preventDefault(); setCover({data: '', preview: null})}}>
                                        <Justicon icon={'trash'} className={classes.controlIcon}/>
                                    </button>
                                </div>
                            </>
                        ) : null}
                    </div>
                    {!cover.preview && (
                        <div className={cx(classes.coverDragPlaceHolder, {[classes.coverDragPlaceHolderActive]: isDragActive})}>
                            <Justicon icon={'upload-cloud'}
                                      className={classes.coverDragIcon}/>
                            <h2>Upload Main Image</h2>
                        </div>
                    )}

                </div>

                <div {...GRP({className: classes.images})} >
                    <input {...GIP()}/>
                    <div className={classes.imagesFrame}>
                        <div className={cx(classes.containerDrag, {[classes.containerDragActive]: iDA})}>
                            <div className={cx(classes.contentDrag, {[classes.contentDragActive]: iDA})}>
                                    <Justicon icon={'upload-cloud'}
                                              className={classes.imagesDragIcon}/>
                                    <h2>Photos</h2>
                            </div>
                        </div>
                        {images.map(file => (
                                <div className={cx(classes.container, {[classes.containerActive]: iDA})}
                                     key={file.preview.toString()}>
                                    <div className={classes.content}>
                                        <img src={file.preview}
                                             className={classes.imagesPreview}
                                             alt=""/>
                                        <div className={classes.controls}>
                                            <button onClick={e => {}}>
                                                <Justicon icon={'trash'} className={classes.controlIcon}/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>


                </div>
                    {submissionUI}
            </div>
        </div>
    )
}

const mSTP = s => ({
    isMobile: s.ui.display.isMobile,
})

export default connect(mSTP)(EditGallery)