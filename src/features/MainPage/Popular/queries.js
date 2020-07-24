import { gql } from '@apollo/client';

export const FETCH_POPULAR = gql`
	query {
		tours {
			_id
            name
            imageCover
            slug
            duration
			createdAt
            price
            startLocation {
                description
            }
            author {
                _id
                name
                photo
            }
		}
	}
`;