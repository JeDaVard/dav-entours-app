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
    const [ cover, setCover ] = useState({
        data: null,
        file: ''
    });
    const [ images, setImages ] = useState([]);
    const [ mutateEditGallery, { loading } ] = useMutation(UPLOAD_IMAGE, {
        variables: { file: cover, id: props._id, }
    });
console.log(images)
    // const onDrop = useCallback(
    //     ([file]) => {
    //         mutateEditGallery({ variables: { file, id: props._id, } });
    //     },
    //     [mutateEditGallery]
    // );

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
    const onCoverDrop = ([file]) => {
        setCover({ data: file, preview: URL.createObjectURL(file)})
    }

    const onImageDrop = (images) => {
    const newImages = images.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
    }))
        setImages(state => [
            ...newImages,
            ...state
        ]);
    }

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
                        <img src={cover.preview ? cover.preview : 'null'} alt="" className={classes.coverImagePreview}/>
                    </div>
                    {!cover.preview && (
                        <div className={cx(classes.coverDragPlaceHolder, {[classes.coverDragPlaceHolderActive]: isDragActive})}>
                            <Justicon icon={'upload-cloud'} className={classes.coverDragIcon}/>
                            <h2>Upload Main Image</h2>
                        </div>
                    )}

                </div>

                <div {...GRP({ className: classes.images})} >
                    <input {...GIP()}/>
                    <div className={classes.imagesFrame}>
                        {/*<div className={cx(classes.imagesDragPlaceHolder,{[classes.imagesDragPlaceHolderActive]: iDA})}>*/}
                        {/*    <Justicon icon={'upload-cloud'} className={classes.imagesDragIcon}/>*/}
                        {/*    <h2>Photos</h2>*/}
                        {/*</div>*/}
                        <div className={cx(classes.containerDrag, {[classes.containerDragActive]: iDA})}>
                            <div className={cx(classes.contentDrag, {[classes.contentDragActive]: iDA})}>
                                    <Justicon icon={'upload-cloud'} className={classes.imagesDragIcon}/>
                                    <h2>Photos</h2>
                            </div>
                        </div>
                        {
                            images.map(file => (
                                <div className={cx(classes.container, {[classes.containerActive]: iDA})} key={file.preview.toString()}>
                                    <div className={classes.content}>
                                        <img src={file.preview} className={classes.imagesPreview} alt=""/>
                                    </div>
                                </div>
                            ))
                        }
                        {/*<img src={'https://media.gettyimages.com/photos/armenia-yerevan-republic-square-dancing-fountains-picture-id1068746262?s=612x612'} alt="" className={classes.imagesPreview}/>*/}
                        {/*<img src={'https://media.gettyimages.com/photos/armenia-yerevan-republic-square-dancing-fountains-picture-id1068746262?s=612x612'} alt="" className={classes.imagesPreview}/>*/}
                        {/*<img src={'https://media.gettyimages.com/photos/armenia-yerevan-republic-square-dancing-fountains-picture-id1068746262?s=612x612'} alt="" className={classes.imagesPreview}/>*/}
                        {/*<img src={'https://media.gettyimages.com/photos/armenia-yerevan-republic-square-dancing-fountains-picture-id1068746262?s=612x612'} alt="" className={classes.imagesPreview}/>*/}
                        {/*<img src={'https://media.gettyimages.com/photos/armenia-yerevan-republic-square-dancing-fountains-picture-id1068746262?s=612x612'} alt="" className={classes.imagesPreview}/>*/}
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