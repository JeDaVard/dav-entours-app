export function validateState(isValid, inputName, setState) {
    if (!isValid) {
        setState(state => ({
            ...state,
            input: {
                ...state.input,
                [inputName]: {
                    ...state.input[inputName],
                    valid: false
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
                    valid: true
                }
            },
            isValid: true
        }))
    }
}