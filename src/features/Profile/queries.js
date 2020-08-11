import { gql } from '@apollo/client'

export const UPDATE_PROFILE = gql`
    mutation UpdateProfile ($photo: String){
        updateProfile (photo: $photo) {
            success
            message
            code
            data {
                photo
                name
            }
        }
    }
`