import { gql } from '@apollo/client';
// import { TourPageFields } from "../TourContainer/queries";

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

export const FETCH_SEARCH_RESULTS = gql`
	query tourSearchResult($initInput: SearchInput) {
		search(initInput: $initInput) {
			hasMore
			nextPage
			total
			data {
				distance
				...SearchQueryFragment
			}
		}
		recommended {
			...SearchQueryFragment
		}
	}
	${SearchQueryFragment}
`