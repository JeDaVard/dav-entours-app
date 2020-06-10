import gql from 'graphql-tag'

export const FETCH_CONVERSATION = gql`
	query fetchConversation($id: ID!)  {
		conversation(id: $id) {
			_id
			createdAt
			tour {
				imageCover
				name
				slug
			}
			participants {
				photo
				name
				_id
			}
			guides {
				photo
				name
				_id
			}
			messages {
				text
				sender {
					photo
					_id
				}
				createdAt
				_id
			}
		}
	}
`