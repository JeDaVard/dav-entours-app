import gql from 'graphql-tag';

export const FETCH_TOUR_EVENTS = gql`
	query {
		tours {
			_id
			slug
			name
			imageCover
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