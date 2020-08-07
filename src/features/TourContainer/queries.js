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
			createdAt
			speaks
		}
		guides {
			_id
			name
			photo
		}
		reviews(page:$page limit:$limit) {
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
`

const SearchQueryFragment = gql`
	fragment SearchQueryFragment on Tour {
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
	query FetchTour($id: ID! $page:Int $limit:Int) {
		tour(id: $id) {
			...TourPageFields
		}
		recommended {
			...SearchQueryFragment
		}
	}
	${TourPageFields}, ${SearchQueryFragment}
`;

export const FETCH_MORE_REVIEWS = gql`
	query fetchMoreReviews($id: ID! $page:Int $limit:Int) {
		tour(id: $id) {
			_id
			reviews(page:$page limit:$limit) {
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