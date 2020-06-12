import gql from 'graphql-tag';

export const FETCH_INBOXES = gql`
	query {
		conversations {
			_id
			createdAt
			tour {
				imageCover
				name
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