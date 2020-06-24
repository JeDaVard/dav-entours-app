import React from "react";
import { connect } from "react-redux";
import classes from './EditGallery.module.css'
import {Form} from "../../../components/UI/LabeledInput/LabeledInput";
import SimpleMobileTop from "../SimpleMobileTop";
import StyledButton from "../../../components/UI/StyledButton/StyledButton";

function EditGallery(props) {

    // const buttonText = props.draft ? <>Save & Next &#8594;</> : <>Save &#10003;</>
    // const submissionUI = props.isMobile ? (
    //     <SimpleMobileTop
    //         to={`/tour/${props.slug}/edit/heading`}
    //         button={props.draft ? 'Next' : 'Save'}
    //         type={'submit'}
    //         icon={props.draft ? 'chevron-right' : 'check'}
    //         children={'Heading'}
    //         loading={loading}
    //         top
    //     />
    // ) : (
    //     <div className={classes.button}>
    //         <StyledButton type={'submit'}>{loading ? <>Saving...</> : buttonText}</StyledButton>
    //     </div>
    // );
    return (
        <Form>
            {/*{submissionUI}*/}
        </Form>
    )
}

const mSTP = s => ({
    isMobile: s.ui.display.isMobile,
})

export default connect(mSTP)(EditGallery)