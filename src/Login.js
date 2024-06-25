import React, {useState, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import ContextObject from './ContextObject'
import JoblyApi from './api'
import {Buffer} from 'buffer'

function Login () {
    const [loginData, setLoginData] = useState({username:'', password:''})
    const {setToken} = useContext(ContextObject)
    let navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        
        let token = await JoblyApi.Login(loginData)
        setLoginData({username:'', password:''})
        setToken(token)
        console.log(token)
        navigate('/')

        return {success: true}
       
    }

    function handleChange(e) {
        const {name, value}=e.target
        setLoginData(prevState => ({
            ...prevState,
            [name]:value
        }))
    }
    return (
        <>
        <h1>Login page</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>Username</label>
                <input type='text' id='username' name='username' value={loginData.username} onChange={handleChange}/>
                <br></br>

                <label htmlFor='password'>Password</label>
                <input type='text' id='password' name='password' value={loginData.password} onChange={handleChange}/>
                <button type='submit'>Submit</button>


            </form>
        </>

    )
}
export default Login