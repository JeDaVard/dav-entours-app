function fetchData(start, success, failed, url) {
    return async dispatch => {
        try {
            dispatch(start())

            const response = await fetch(url);
            const result = await response.json();

            if (result.status === 'failed') {
                return dispatch(failed(`Oops.. ${result.error.message}`))
            }
            dispatch(success(result.data.data))
        } catch (e) {
            dispatch(failed(`Oops.. ${e}`))
        }
    }
}

export { fetchData }