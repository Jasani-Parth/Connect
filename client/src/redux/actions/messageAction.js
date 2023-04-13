import { GLOBALTYPES, DeleteData } from '../actions/globalTypes'
import { postDataAPI, getDataAPI, deleteDataAPI } from '../../utils/fetchData'

export const MESS_TYPES = {
  ADD_USER: "ADD_USER",
  ADD_MESSAGE: "ADD_MESSAGE",
  GET_CONVERSATIONS: "GET_CONVERSATIONS",
  GET_MESSAGES: 'GET_MESSAGES',
  DELETE_MESSAGES: 'DELETE_MESSAGES',
};

export const addUser =
  ({ user, message }) =>
    (dispatch) => {
      if (message.users.every((item) => item._id !== user._id)) {
        dispatch({ type: MESS_TYPES.ADD_USER, payload: { ...user, text: '', media: [] } });
      }
    };

export const addMessage =
  ({ msg, auth, socket }) =>
    async (dispatch) => {
      dispatch({ type: MESS_TYPES.ADD_MESSAGE, payload: msg });
      socket.emit('addMessage', msg)
      try {
        await postDataAPI('message', msg, auth.token)
      } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
      }
    };

export const getConversations = ({ auth }) => async (dispatch) => {
  try {
    const res = await getDataAPI('conversations', auth.token)
    let newArr = [];
    res.data.conversations.forEach(item => {
      item.recipients.forEach(cv => {
        if (cv._id !== auth.user._id) {
          newArr.push({ ...cv, text: item.text, media: item.media })
        }
      })
    })

    dispatch({
      type: MESS_TYPES.GET_CONVERSATIONS,
      payload: { newArr, result: res.data.result }
    })

  } catch (err) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
  }
}

export const getMessages = ({ auth, id }) => async (dispatch) => {
  try {
    const res = await getDataAPI(`message/${id}`, auth.token)
    const newData = { ...res.data, messages: res.data.messages.reverse() }
    dispatch({ type: MESS_TYPES.GET_MESSAGES, payload: { ...newData, _id: id } })
  } catch (err) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
  }
}

export const deleteMessages = ({msg, data, auth}) => async (dispatch) => {
  const newData = DeleteData(data, msg._id)
  dispatch({type: MESS_TYPES.DELETE_MESSAGES, payload: {newData, _id:msg.recipient}})
  try {
    await deleteDataAPI(`message/${msg._id}`,auth.token)
  } catch (err) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
  }
}
