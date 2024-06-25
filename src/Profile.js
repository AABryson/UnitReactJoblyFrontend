import React, {useContext, useState} from 'react'
import ContextObject from './ContextObject'
import JoblyApi from './api'
import './Profile.css'

function Profile () {
    const {currentUser, setCurrentUser} = useContext(ContextObject)
    console.log('profile page being rendered with currentUser', currentUser)

    const [changeProfile, setChangeProfile] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        console.log('handle submit before called updateUserInfo', currentUser.username)

        let firstName = currentUser.firstName
        let lastName = currentUser.lastName
        let email = currentUser.email
        let password = currentUser.password
        let userToUpdate = {firstName, lastName, email, password}
        console.log('new userToUpdate before sending request', userToUpdate)
        // setChangeProfile(true)
        if(changeProfile){
        let updatedUser = await JoblyApi.updateUserInfo(currentUser.username, userToUpdate)
        // (currentUser.username)
        console.log('after clicking submit button', updatedUser)
        setCurrentUser(updatedUser)
        setChangeProfile(false)}

    }

    function handleChange (e) {
        const {name, value} = e.target
        
        setCurrentUser(prevState => ({
            ...prevState,
            
            [name]: value
        }))

   
    }

    return (
        
        <>
        {!changeProfile ? (
        <div className='profile'>
            <h1>{currentUser.userName}'s page</h1>
            {/* <h2>Username: {currentUser.username}</h2> */}
            <h2>First Name: {currentUser.firstName}</h2>
            <h2>Last Name: {currentUser.lastName}</h2>
            <h2>Email: {currentUser.email}</h2>
{/**################################################# */}
        <button onClick={() => 
            {setChangeProfile(true)}}>Change Profile</button>
        </div>
        ) : (
        <div>
            {/**Don't need to reset current user.  I just forgot the name attributet. */}
            {/* {setCurrentUser('')} */}
            <form onSubmit={handleSubmit}>
            {/* <label htmlFor='username'>Username</label>
            <input style={{margin:'10px'}} type='text' id='username' name='username' value={currentUser.username} onChange={handleChange} />
            <br></br> */}

            <label htmlFor='firstName'>First Name</label>
            <input style={{margin:'10px'}} type='text' id='firstName' name='firstName' value={currentUser.firstName} onChange={handleChange} />
            <br></br>   

            <label htmlFor='lastName'>Last Name</label>
            <input style={{margin:'10px'}} type='text' id='lastName' name='lastName' value={currentUser.lastName} onChange={handleChange}/>
            <br></br>

            <label htmlFor='password'>Password</label>
            <input style={{margin:'10px'}} type='text' id='password' name='password' value={currentUser.password} onChange={handleChange}/>
            <br></br>

            <label htmlFor='email'>Email</label> 
            <input style={{margin:'10px'}} type='text' id='email' name='email' value={currentUser.email} onChange={handleChange}/>
            <br></br>
            <button type='submit'>Submit</button>



        </form>
        </div>
        
        )}
        </>


    )
}
export default Profile