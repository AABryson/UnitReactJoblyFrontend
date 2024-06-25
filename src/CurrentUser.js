// import {useState, useEffect, useContext} from 'react'
// import {jwt} from 'jsonwebtoken'
// import ContextObject from './ContextObject'

// function CurrentUser () {
//     let {currentUser, setCurrentUser, token} = useContext(ContextObject)

//     useEffect(function userInfo(){
//         let payload = jwt.decode(token)
//         let username = payload.username
//         setCurrentUser(username)
//         console.log(username)
//     }, [token]
//     )

//     return null
// }
// export default CurrentUser