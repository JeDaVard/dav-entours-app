import gql from 'graphql-tag';

export const FETCH_TOUR = gql`
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