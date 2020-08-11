export function validateState(isValid, inputName, setState, message) {
    if (!isValid) {
        setState(state => ({
            ...state,
            input: {
                ...state.input,
                [inputName]: {
                    ...state.input[inputName],
                    valid: false,
                    message
                }
            },
            isValid: false
        }))
    } else {
        setState(state => ({
            ...state,
            input: {
                ...state.input,
                [inputName]: {
                    ...state.input[inputName],
                    valid: true,
                    message: ''
                }
            },
            isValid: true
        }))
    }
}