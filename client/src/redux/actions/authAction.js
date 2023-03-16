import { postDataAPI } from '../../utils/fetchData'

export const TYPES = {
    AUTH: 'AUTH'
}

export const login = (data) => async (dispatch) => {
    try {
        dispatch({ type: 'NOTIFY', payload: { loading: true } })
        const res = await postDataAPI('login', data)
        dispatch({ type: 'AUTH', payload: { token: res.data.access_token , user: res.data.user} })
        localStorage.setItem("firstLogin", true)
        dispatch({ type: 'NOTIFY', payload: { success: res.data.msg } })
        console.log(res)
    } catch (error) {
        dispatch({ type: 'NOTIFY', payload: { err: error.response.data.msg } })
    }
}