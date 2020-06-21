import gql from 'graphql-tag'

export const FETCH_MY_TOURS = gql`
	query {
		me {
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
				ratingsAverage
                ratingsQuantity
				draft
			}
		}
	}
`

export const FETCH_MY_GUIDE_TOURS = gql`
	query {
		me {
			asGuide {
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
				ratingsAverage
				ratingsQuantity
				draft
			}
		}
	}
`

export const FETCH_MY_DRAFT_TOURS = gql`
	query {
		me {
			draft {
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
				ratingsAverage
				ratingsQuantity
				draft
			}
		}
	}
`