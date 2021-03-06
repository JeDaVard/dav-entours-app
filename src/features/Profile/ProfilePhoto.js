import React, {useState} from "react";
import { useHistory } from 'react-router-dom';
import classes from './ProfilePhoto.module.css';
import Image from "../../components/UI/Image/Image";
import SimpleButton from "../../components/UI/SimpleButton/SimpleButton";
import {useDispatch} from "react-redux";
import {FINISH_PROFILE_PHOTO} from "../../app/actions/ui/types";
import {UPLOAD_IMAGE} from "../Make/queries";
import {UPDATE_PROFILE} from "./queries";
import {generateBase64FromImage} from "../../utils/generateBase64FromImage";
import StyledButton from "../../components/UI/StyledButton/StyledButton";
import {gql, useApolloClient, useMutation} from "@apollo/client";
import axios from "axios";

export default function ProfilePhoto(props) {
    const client = useApolloClient();
    const history = useHistory();
    const dispatch = useDispatch();
    const { name } = props;

    const [ input, setInput ] = useState({
        loading: false,
        photo: null,
        b64: null,
        currentPhoto: localStorage.getItem('photo') || null
    });

    const [ signURL, { loading} ] = useMutation(UPLOAD_IMAGE);
    const [ updateProfile ] = useMutation(UPDATE_PROFILE, {
        onCompleted({updateProfile}) {
            if (updateProfile.data) {
                const { photo, name } = updateProfile.data;

                const data = client.readQuery({
                    query: gql`
						query {
							loggedIn @client
							photo @client
							name @client
							userId @client
						}
                    `
                });

                client.writeQuery({
                    query: gql`
						query {
							loggedIn
							photo
							name
							userId
						}
                    `,
                    data: {
                        ...data,
                        photo: input.b64,
                        name,
                    }
                });
            }
        },
        onError(e) {
            console.log(e)
        }
    });
    

    const changeHandler = (e) => {
        const target = e.target;
        if (!target.files) return;
        const photo = target.files[0]

        if (photo && target.name === 'photo') {
            generateBase64FromImage(photo)
                .then(b64 => {
                    setInput((state) => ({
                            ...state,
                            b64,
                            photo,
                        })
                    );
                })
                .catch(e => {
                    setInput((state) => ({
                        ...state,
                        b64: null,
                        photo: null
                    }));
                });
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if (input.loading) return;

        setInput(p => ({...p, loading: true}))

        let key;
        if (input.photo) {
            const res = await signURL({
                variables: {
                    fileName: `avatar_${Date.now()}.jpg`,
                    contentType: input.photo.type,
                    genre: 'avatar',
                    id: 'doesn\'t make sense'
                }
            });

            const { url } = res.data.uploadImage;
            key = res.data.uploadImage.key;

            await axios.put(url, input.photo,{
                headers: {
                    'Content-Type': input.photo.type
                },
            })
            const variables = {}
            if (key) variables.photo = key;

            await updateProfile({
                variables
            })
            localStorage.setItem('photo', key)
        }
        setInput(p => ({...p, loading: false, photo: null}))
    }

    const navHandler = (e, dir) => {
        e.preventDefault();

        dispatch({type: FINISH_PROFILE_PHOTO});
        history.push(dir)
    }

    const uiPhoto = input.b64 || `${process.env.REACT_APP_CDN}/${input.currentPhoto}`

    return (
        <div>
            <form
                onSubmit={submitHandler}
                className={classes.NexUp}>
                {/*<h2 className={classes.success}>You are successfully Signed Up</h2>*/}
                <p className={classes.pText}>Choose your image by taping on default avatar down below</p>
                <div className={classes.preview}>
                    <div className={classes.user}>
                        <h2>{name}</h2>
                        <div>
                            <label htmlFor="photo">
                                <div className={classes.image}>
                                    <Image
                                        url={uiPhoto}
                                    />{' '}
                                </div>
                            </label>
                            <input
                                type="file"
                                name="photo"
                                id="photo"
                                accept='.jpeg, .jpg, .png, .JPEG, .JPG, .PNG'
                                onChange={changeHandler}
                                className={classes.fileInput}
                            />
                        </div>
                    </div>
                </div>
                <p className={classes.pText}>You automatically accept
                    our <a href="/policy">Policies</a> by clicking the button bellow</p>
                <StyledButton disabled={!input.photo} loading={input.loading}>
                    Save
                </StyledButton>
                <div className={classes.upButtons}>
                    <SimpleButton onClick={e => navHandler(e, '/make')} primary>
                        Start making a tour
                    </SimpleButton >
                    <SimpleButton onClick={e => navHandler(e, '/')} primary>
                        Discover the planet
                    </SimpleButton >
                </div>
            </form>
        </div>
    )
}