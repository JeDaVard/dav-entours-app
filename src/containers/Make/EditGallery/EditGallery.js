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
import {loadingOff, loadingOn} from "../../../app/actions";
const cx = classNames.bind(classes)

function EditGallery(props) {
    const initialCover = props.imageCover
        ? { data: null, preview: props.imageCover }
        : { data: null, preview: '' };

    const initialImages = props.images.length
        ? props.images.map(image => ({data: null, preview: image })).slice().reverse()
        : [];

    const [ cover, setCover ] = useState(initialCover);

    const [ images, setImages ] = useState(initialImages);

    const [ signURL, { loading } ] = useMutation(UPLOAD_IMAGE);
    // "images" : [
    //     "tour-1-1.jpg",
    //     "tour-1-2.jpg",
    //     "tour-1-3.jpg"
    // ],
    //     "imageCover" : "tour-1-cover.jpg",

    const [ mutateCover] = useMutation(EDIT_TOUR_GALLERY);

    const onEditGallery = async (e) => {
        e.preventDefault();
        props.loadingOn();

        let key = null;
        let uploadedImagesToDB = [];

        if (cover.data) {
            const res = await signURL({
                variables: { fileName: 'main.jpg', contentType: cover.data && cover.data.type, id: props._id, }
            });

            key = res.data.uploadImage.key;
            const url = res.data.uploadImage.url;

            await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': cover.data && cover.data.type
                },
                body: cover.data,
            })
        }

        const imagesToUpload = images.filter(image => image.data).map(image => image.data)

        const uploadsToAsync = async () => Promise.all(imagesToUpload.map((file, index) => {
            return signURL({
                    variables: { fileName: `image_${index}_${Date.now()}.jpg`, contentType: file.type, id: props._id, }
                })
        }))
        const urlKeyResponses = await uploadsToAsync();
        const uploadsToS3 = async () => Promise.all(urlKeyResponses.map((toUpload, index) => {
            return fetch(toUpload.data.uploadImage.url, {
                method: 'PUT',
                headers: {
                    'Content-Type': imagesToUpload[index].type
                },
                body: imagesToUpload[index],
            })
        }))
        const results = await uploadsToS3();
        uploadedImagesToDB = urlKeyResponses.map(item => item.data.uploadImage.key)

        const oldImages = images.filter(image => !image.data).map(image => image.preview)

        const imagesToDB = [...uploadedImagesToDB, ...oldImages].reverse()


        mutateCover({variables: {
                id: props._id,
                imageCover: key,
                images: imagesToDB
            }}).then((res) => {
            props.loadingOff();
            console.log(res);
        }).catch(e => {
            props.loadingOff();
            console.log('e', e)
        })
    };

    const onCoverDrop = useCallback(([file]) => {
        setCover({ data: file, preview: URL.createObjectURL(file)})
    }, [])
    // console.log(images, cover)

    const onImageDrop = useCallback( (images) => {
    const newImages = images.map(file => Object.assign({data: file}, {
        preview: URL.createObjectURL(file)
    }))
        setImages(state => [
            ...newImages,
            ...state
        ]);
    }, []);


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
            loading={props.reduxLoading}
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
            <form onSubmit={(e) => onEditGallery(e)} className={classes.uploadForm}>
                <div {...getRootProps({ className: classes.coverImage})} >
                    <input {...getInputProps()}/>
                    <div className={classes.coverImageFrame}>
                        {cover.preview ? (
                            <>
                                <img src={cover.preview.startsWith('blob') ? cover.preview : `${process.env.REACT_APP_CDN}/${cover.preview}`}
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
                                        <img src={file.preview.startsWith('blob') ? file.preview : `${process.env.REACT_APP_CDN}/${file.preview}`}
                                             className={classes.imagesPreview}
                                             alt=""/>
                                        <div className={classes.controls}>
                                            <button onClick={e => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                                const newState = images.filter(image => image.preview !== file.preview);
                                                setImages(newState)
                                            }}>
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
    reduxLoading: s.ui.loading
})

export default connect(mSTP, {loadingOn, loadingOff})(EditGallery)