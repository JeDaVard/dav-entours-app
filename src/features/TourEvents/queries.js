import { gql } from '@apollo/client';

export const CANCEL_ORDER = gql`
    mutation CancelOrder ($id: ID!) {
        cancelOrder(id: $id) {
            success
			message
			code
			data {
				_id
				start {
					_id
					date
					participants {
						_id
					}
				}
				buyer {
					_id
					name
					photo
					email
				}
				invited {
					_id
					name
					photo
					email
				}
				tour {
					_id
					slug
					name
					imageCover
					startLocation {
						description
					}
					maxGroupSize
				}
			}
        }
    }
`

export const FETCH_CURRENT_ORDERS = gql`
	query CurrentOrders {
		me {
			orders {
				_id
                start {
                    _id
                    date
                    participants {
                        _id
                    }
                }
                buyer {
                    _id
                    name
                    photo
                    email
                }
                invited {
                    _id
                    name
                    photo
                    email
                }
                tour {
					_id
					slug
					name
					imageCover
					startLocation {
						description
					}
					maxGroupSize
                }
			}
        }
	}
`

export const FETCH_PAST_ORDERS = gql`
	query PastOrders {
		me {
			pastOrders {
				_id
				start {
					_id
					date
					participants {
						_id
					}
				}
				buyer {
					_id
					name
					photo
					email
				}
				invited {
					_id
					name
					photo
					email
				}
				tour {
					_id
					slug
					name
					imageCover
					startLocation {
						description
					}
					maxGroupSize
				}
			}
		}
	}
`