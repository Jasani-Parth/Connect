import React, {useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { MESS_TYPES } from './redux/actions/messageAction'

const SocketClient = () => {
    const {auth,socket} = useSelector(state => state)
    const dispatch = useDispatch()

    //Join User
    useEffect(() => {
        socket.emit('joinUser', auth.user._id)
    },[socket,auth.user._id])

    // Message
    useEffect(() => {
        socket.on('addMessageToClient', msg =>{
            dispatch({type: MESS_TYPES.ADD_MESSAGE, payload: msg})
        })

        return () => socket.off('addMessageToClient')
    },[socket, dispatch])

  return <></>
}

export default SocketClient
