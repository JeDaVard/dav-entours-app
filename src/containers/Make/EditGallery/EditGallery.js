import React, { useCallback, useState } from "react";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import classes from './EditGallery.module.css'
import { EDIT_TOUR_GALLERY, UPLOAD_IMAGE } from "../queries";
import SimpleMobileTop from "../SimpleMobileTop";
import StyledButton from "../../../components/UI/StyledButton/StyledButton";
import { useMutation } from "@apollo/react-hooks";
import { useDropzone } from "react-dropzone";
import EditImages from "./EditImages";
import EditCover from "./EditCover";

function EditGallery(props) {
    const history = useHistory();
    const { imageCover } = props;
    const images = props.images;
    const reversedImages = props.images.slice().reverse()
    
    const [ signURL ] = useMutation(UPLOAD_IMAGE);
    const [ loading, setLoading ] = useState({
        cover: false,
        images: false
    });

    const [ percent, setPercent ] = useState({cover: 0, images: 0})

    const [ mutateGallery] = useMutation(EDIT_TOUR_GALLERY);

    const onCoverDrop = useCallback(async ([file]) => {
        if (loading.images || loading.cover) return;
        setLoading(s => ({...s, cover: true}))
        const res = await signURL({
            variables: {
                // We slice from 6 to cut the "image/" and keep the file extension
                fileName: `main_${Date.now()}.jpg`,
                contentType: file.type,
                id: props._id
            }
        });

        const { key, url } = res.data.uploadImage;

        await axios.put(url, file,{
            headers: {
                'Content-Type': file.type
            },
            onUploadProgress: (event) => {
                // console.log(event);
                // console.log(Math.floor(event.loaded * 100 / event.total), event.total)
                const p = Math.floor(event.loaded * 100 / event.total)
                if (p < 100) {
                    setPercent({images: 0, cover: p})
                } else {
                    setPercent({images: 0, cover: 0})
                }
            }
        })

        await mutateGallery({
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

        await axios.put(url, file,{
            headers: {
                'Content-Type': file.type
            },
            onUploadProgress: (event) => {
                const p = Math.floor(event.loaded * 100 / event.total)
                if (p < 100) {
                    setPercent({images: p, cover: 0})
                } else {
                    setPercent({images: 0, cover: 0})
                }
            }
        })

        await mutateGallery({
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
            type='submit'
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

    const submitHandler = (e) => { e.preventDefault(); history.push(`/tour/${props.slug}/edit/details`)}

    const removeImage = useCallback(async (e, imageLink) => {
        e.stopPropagation();
        e.preventDefault();

        if (loading.cover || loading.images) return;
        await mutateGallery({
            variables: {
                id: props._id,
                removeImage: imageLink || imageCover,
                imageCover: imageLink ? imageCover : null,
                images: imageLink ? images.filter(image => image !== imageLink) : images
            }
        })
    }, [imageCover, images, loading.images, loading.cover]);

    return (
        <div className="row">
            <form onSubmit={submitHandler} className={classes.uploadForm}>
                <EditCover
                    getRootProps={getRootProps}
                    getInputProps={getInputProps}
                    isDragActive={isDragActive}
                    loading={loading}
                    imageCover={imageCover}
                    removeImage={removeImage}
                    percent={percent.cover}
                />
                <EditImages
                    getRootProps={GRP}
                    getInputProps={GIP}
                    isDragActive={iDA}
                    removeImage={removeImage}
                    images={reversedImages}
                    loading={loading}
                    percent={percent.images}
                />
                    {submissionUI}
            </form>
        </div>
    )
}

export default EditGallery