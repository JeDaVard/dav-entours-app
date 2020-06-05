import gql from 'graphql-tag';

export const FETCH_USER = gql`
	query fetchUser($id: ID!) {
		user(id: $id) {
			_id
			name
			createdAt
            photo
            speaks
            reviews {
                _id
                createdAt
                review
                tour {
                    _id
                    slug
                    name
                    imageCover
                    
                }
                author {
                    _id
                    name
                    createdAt
                    photo
                }
            }
            tours {
                _id
                name
				slug
				startDates
                imageCover
                createdAt
                ratingsAverage
                ratingsQuantity
				startLocation {
                    description
                }
                participants {
                    _id
                }
                maxGroupSize
            }
		}
	}
`;