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
				starts {
					_id
					date
					participants {
						_id
						name
						photo
					}
				}
				startLocation {
					description
				}
				maxGroupSize
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
			starts {
				_id
				date
				participants {
					_id
					name
					photo
				}
			}
			startLocation {
				description
			}
			maxGroupSize
		}
	}
`

export const SAVE_TOUR = gql`
	mutation saveTour($id: ID!) {
		saveTour(id: $id) {
			_id
			slug
			name
			images
			ratingsAverage
			startLocation {
				description
			}
			maxGroupSize
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