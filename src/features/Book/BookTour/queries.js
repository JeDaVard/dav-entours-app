import { gql } from '@apollo/client';

export const FETCH_TOUR_FOR_ORDER = gql`
    query fetchTourForOrder($id: ID!) {
        tour(id: $id) {
            name
            _id
            slug
            imageCover
            price
            ratingsQuantity
            ratingsAverage
            startLocation {
                address
                coordinates
            }
            author {
                _id
                name
                photo
                createdAt
                speaks
            }
            starts {
                _id
                date
                participants {
                    _id
                    name
                    photo
                }
            }
        }
        me {
            photo
            name
            email
        }
    }
`