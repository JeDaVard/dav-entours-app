import gql from 'graphql-tag'

export const INTENT_PAYMENT = gql`
	mutation intentPayment {
		intentPayment {
			pKey
			cSecret
		}
	}
`