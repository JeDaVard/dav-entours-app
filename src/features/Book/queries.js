import {gql} from "@apollo/client";

export const FETCH_ADDED_MEMBER = gql`
	mutation addMember($email: String!) {
		inviteUser(email: $email) {
			success
			code
			message
			data {
				_id
				email
				name
				photo
			}
		}
	}
`