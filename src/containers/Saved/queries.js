import gql from 'graphql-tag';

export const FETCH_SAVED = gql`
	query {
		tours {
			_id
			slug
			name
			images
			ratingsAverage
            startDates
			startLocation {
				description
			}
			maxGroupSize
			participants {
				_id
			}
		}
	}
`;