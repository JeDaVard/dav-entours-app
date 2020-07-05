import gql from 'graphql-tag';

export const FETCH_INBOXES = gql`
	query {
		me {
			conversations {
				_id
				createdAt
				tour {
					_id
					imageCover
					name
					slug
				}
				start {
					staff {
						_id
						name
						photo
					}
					participants {
						_id
						name
						photo
					}
				}
				lastMessage {
					text
					sender {
						name
					}
				}
			}
		}
	}
`