import gql from 'graphql-tag';

export const FETCH_TOUR = gql`
	query FetchTour($id: ID!) {
		tour(id: $id) {
			_id
			name
			imageCover
			slug
			duration
			createdAt
			price
			description
			summary
			hashtags
			difficulty
			images
			ratingsAverage
			ratingsQuantity
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
			startLocation {
				description
				coordinates
				address
			}
			locations {
				_id
				description
				coordinates
				address
				day
			}
			author {
				_id
				name
				photo
			}
			guides {
				_id
				name
				photo
			}
			reviews {
				review
				_id
				author {
					_id
					photo
					name
					createdAt
				}
			}

		}
	}
`;