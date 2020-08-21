import { gql } from '@apollo/client';

export const TourPageFields = gql`
	fragment TourPageFields on Tour {
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
			createdAt
			speaks
		}
		guides {
			_id
			name
			photo
		}
	}
`

export const FETCH_TOUR = gql`
	query FetchTour($id: ID!) {
		tour(id: $id) {
			...TourPageFields
		}
	}
	${TourPageFields}
`;

export const FETCH_TOUR_REVIEWS = gql`
	query FetchTour($id: ID! $page:Int $limit:Int) {
		tour(id: $id) {
			reviews(page:$page limit:$limit) @connection(key: "reviews") {
				hasMore
				nextPage
				total
				data {
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
	}
`;

export const FETCH_TOUR_STARTS = gql`
	query FetchTourStarts($id: ID!){
		tour(id: $id) {
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