import gql from 'graphql-tag';

export const FETCH_TOUR_FOR_ORDER = gql`
    query fetchTourForOrder($id: ID!) {
        tour(id: $id) {
            name
            _id
            slug
            imageCover
            price
            startLocation {
                address
                coordinates
            }
            author {
                _id
                name
                photo
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
    }
`