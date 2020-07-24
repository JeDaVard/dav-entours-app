import { gql } from '@apollo/client';

export const SIGN_IN = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			_id
			name
			photo
		}
	}
`;

export const SIGN_UP = gql`
	mutation UpdateTodo($email: String!, $password: String!, $name: String!) {
		signUp(email: $email, password: $password, name: $name) {
			_id
			name
			photo
		}
	}
`;