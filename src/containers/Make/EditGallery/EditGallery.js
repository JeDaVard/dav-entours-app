import React, {useCallback, useState} from "react";
import { connect } from "react-redux";
import classes from './EditGallery.module.css'
import {Form} from "../../../components/UI/LabeledInput/LabeledInput";
import SimpleMobileTop from "../SimpleMobileTop";
import StyledButton from "../../../components/UI/StyledButton/StyledButton";
import {useMutation} from "@apollo/react-hooks";
import {EDIT_TOUR_GALLERY} from "../queries";
import {useDropzone} from "react-dropzone";

function EditGallery(props) {
    const [ file, setFile ] = useState(null);
    const [ mutateEditGallery, { loading } ] = useMutation(EDIT_TOUR_GALLERY);

    const onDrop = useCallback(
        ([file]) => {
            mutateEditGallery({ variables: { file, id: props._id, } });
        },
        [mutateEditGallery]
    );

    const onEditGallery = (e) => {
        e.preventDefault();

        mutateEditGallery();
    }

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

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Drop the files here ...</p>
            ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
            )}
        </div>
        // <Form onSubmit={onEditGallery} >
        //     <input type="file" name={'file'} id={'fileInput'} accept={'image/*'} onChange={(e) => onFile(e)} multiple/>
        //     <label htmlFor="fileInput">File Input</label>
        //     {submissionUI}
        // </Form>
    )
}

const mSTP = s => ({
    isMobile: s.ui.display.isMobile,
})

export default connect(mSTP)(EditGallery)