import gql from 'graphql-tag';

export const FETCH_SAVED = gql`
	query {
		me {
			saved {
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
	}
`;

export const REMOVE_SAVED_TOUR = gql`
	mutation removeSavedTour($id: ID!) {
		removeSavedTour(id: $id) {
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
`