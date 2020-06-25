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
    const [ file, setFile ] = useState({
        data: null,
        file: ''
    });
    const [ mutateEditGallery, { loading } ] = useMutation(UPLOAD_IMAGE, {
        variables: { file, id: props._id, }
    });

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
            body: file,
        })
        console.log(key)
    }
    const onDrop = ([file]) => {
        console.log('dragging')
        setFile({ data: file, preview: URL.createObjectURL(file)})
    }
    console.log(file)
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const buttonText = props.draft ? <>Save & Next &#8594;</> : <>Save &#10003;</>
    const submissionUI = props.isMobile ? (
        <SimpleMobileTop
            to={`/tour/${props.slug}/edit/heading`}
            button={props.draft ? 'Next' : 'Save'}
            type={'submit'}
            icon={props.draft ? 'chevron-right' : 'check'}
            children={'Heading'}
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

    const onFile = (e) => {
        const file = e.target.files[0]
        setFile(file)
    }
    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        URL.revokeObjectURL(file.preview)
    }, [file]);
    return (
        <div className="row">
            <div className={classes.uploadForm}>
                <div {...getRootProps({ className: classes.coverImage})} >
                    <input {...getInputProps({className: classes.inputCover})}/>
                    <div className={classes.coverImageFrame}>
                        <img src={file.preview ? file.preview : 'null'} alt="" className={classes.coverImagePreview}/>
                    </div>

                        <div className={cx(classes.coverDrag, {[classes.coverDragActive]: isDragActive})}>
                            <div className={classes.coverDragPlaceHolder}>
                                <Justicon icon={'upload-cloud'} className={classes.coverDragIcon}/>
                                <h2>Upload Main Image</h2>
                            </div>
                        </div>

                </div>
                {/*<Form onSubmit={onEditGallery} >*/}
                {/*    <input type="file" name={'file'} id={'fileInput'} accept={'image/*'} onChange={(e) => onFile(e)} multiple/>*/}
                {/*    <label htmlFor="fileInput">File Input</label>*/}
                    {submissionUI}
                {/*</Form>*/}
            </div>
        </div>
    )
}

const mSTP = s => ({
    isMobile: s.ui.display.isMobile,
})

export default connect(mSTP)(EditGallery)