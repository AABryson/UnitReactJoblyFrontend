import React, {useContext} from 'react'
import ContextObject from './ContextObject'

function Logout () {
    let {setCurrentUser, setToken, setApplicationIds} = useContext(ContextObject) 
    //####################null?
    setCurrentUser('')
    setApplicationIds()
    setToken(null)
    
    
    localStorage.removeItem('user')
    if(localStorage.getItem('user'===null)){
        console.log('key and token removed from storage')
    }



    return (
        <h1>Logged Out</h1>
    )

}

export default Logout
