import gql from 'graphql-tag';

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