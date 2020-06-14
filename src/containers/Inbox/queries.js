import gql from 'graphql-tag';

export const FETCH_INBOXES = gql`
	query {
		conversations {
			_id
			createdAt
			tour {
				_id
				imageCover
				name
				slug
			}
			guides {
				photo
				name
			}
			lastMessage {
				text
				sender {
					name
				}
			}
		}
	}
`