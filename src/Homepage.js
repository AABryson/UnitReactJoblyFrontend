import React, {useContext} from 'react'
import ContextObject from './ContextObject'

function Homepage () {

    let {currentUser} = useContext(ContextObject)

    return (
        <>
        <h1>Home Page</h1>
        {currentUser ? (
        <h2>Welcome {currentUser.firstName}</h2>
        ) : (<h2>Welcome.  Please Login or Signup.</h2>)
        }
        </>
    )
}

export default Homepage