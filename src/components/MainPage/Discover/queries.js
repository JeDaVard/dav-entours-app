import gql from 'graphql-tag';

export const FETCH_DISCOVER = gql`
	query {
		tours {
			slug
			_id
			name
			imageCover
            summary
		}
	}
`;