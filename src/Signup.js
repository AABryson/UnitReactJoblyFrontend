import React, {useState, useContext} from 'react'
import JoblyApi from './api'
import ContextObject from './ContextObject'
import {useNavigate} from 'react-router-dom'


function Signup () {
//register new user; username, password, firstName, lastName, email, isAdmin
//#################################can't use first_name or last_name


    const [signupData, setSignupData] = useState({username:'', password:'', firstName:'', lastName:'', email:''})
    //instance is not allowed to have addition property isAdmin
    //({username:'', password:'', firstName:'', lastName:'', email:'', isAdmin:true})
    let navigate = useNavigate()

    const {setToken} = useContext(ContextObject)

    function handleChange (e) {
        const {name, value} = e.target
        //#####################################({
        setSignupData(prevState => ({
            ...prevState,
            [name]: value
    }))
    }

    async function handleSubmit (e) {
        e.preventDefault()
        //execute function that sends post request to api
        let token = await JoblyApi.signUp(signupData)
        console.log(signupData)
        setToken(token)
        setSignupData({username:'', password:'', firstName:'', lastName:'', email:''})
        console.log(token)
        navigate('/')

        return token
        //example of token returned:
        {/**eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImthY3kiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNzE4ODQyODA0fQ.H6fZ_m5uSz_HG9FADChEEwDY61Yvz1 */}
       
    }

    console.log(signupData)

    return (
        <>
        <h1>Signup page</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor='username'>Username</label>
            <input type='text' id='username' name='username' value={signupData.username} onChange={handleChange}/>
            <br></br>   

            <label htmlFor='password'>Password</label>
            <input type='text' id='password' name='password' value={signupData.password} onChange={handleChange}/>
            <br></br>

            <label htmlFor='firstName'>First Name</label>
            <input type='text' id='firstName' name='firstName' value={signupData.firstName} onChange={handleChange}/>
            <br></br>

            <label htmlFor='lastName'>Last Name</label>
            <input type='text' id='lastName' name='lastName' value={signupData.lastName} onChange={handleChange}/>
            <br></br>

            <label htmlFor='email'>Email</label>
            <input type='text' id='email' name='email' value={signupData.email} onChange={handleChange}/>

            <button type='submit'>Submit</button>

        </form>
        </>

    )
}
export default Signup