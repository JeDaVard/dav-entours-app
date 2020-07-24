import { gql } from '@apollo/client';

export const FETCH_TOP_USERS = gql`
	query {
		users {
			_id
            photo
			name
            createdAt
			speaks
            reviews {
                _id
            }
            tours {
                _id
				ratingsAverage
                reviews {
                    _id
                }
            }
		}
	}
`;