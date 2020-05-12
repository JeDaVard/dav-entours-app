function fetchData(start, success, failed, url, token) {
    return async dispatch => {
        try {
            dispatch(start())

            const response = token
                ? await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                        }
                })
                : await fetch(url);
            const result = await response.json();

            if (result.status === 'failed' || result.status === 'fail') {
                return dispatch(failed(`Oops.. ${result.message}`))
            }
            dispatch(success(result.data.data))
        } catch (e) {
            dispatch(failed(`Oops... ${e}`))
        }
    }
}

export { fetchData }