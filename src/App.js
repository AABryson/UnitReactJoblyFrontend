//#############################################beginning to write function for applying to job
import {Routes, Route} from 'react-router-dom'
import {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import ContextObject from './ContextObject'
import NavBar from './NavBar'
import Homepage from './Homepage'
import Companies from './Companies'
import Company from './Company'
import Jobs from './Jobs'
import Login from './Login'
import Logout from './Logout'
import Signup from './Signup'
import Profile from './Profile'
// import {jwt} from 'jsonwebtoken'
import {jwtDecode} from 'jwt-decode';
import JoblyApi from './api'
import './App.css'


function App() {
  // const [loggedIn, setLoggedIn] = useState(false)
  //###############################null? or empty object??
  const [currentUser, setCurrentUser] = useState('')
  const [token, setToken] = useState(localStorage.getItem('user'));
  const [applicationIds, setApplicationIds] = useState(new Set([]));
  console.log('applicationIds on app.js', applicationIds)
  

  
  
  // if(currentUser) {
  //   setCurrentUser(prevState => ({
  //     ...prevState,
  //     isAdmin:true
  //   }))
  // }
  
  
//   const [token, setToken] = useLocalStorage(TOKEN_KEY='jobly-token')
// //sychronize state with browser's local storage; state persists even when page refreshed, etc.
//   function useLocalStorage(key, defaultValue=null) {
//     //#initialize state with value retrieved from local storage
//     const initialValue = localStorage.getItem(key) || defaultValue
//     const [localstorageItem, setLocalStorageItem] = useState(initialValue)
//     useEffect(function setKeyInLocalStorage(){
//       if(localstorageItem===null) {
//         localStorage.removeItem(key)
//       } else {
//         localStorage.setItem(key, localstorageItem)
//       }
//     }, [key, localstorageItem]);
  
//     return [localstorageItem, setLocalStorageItem]
//   }
  useEffect(function userInfo(){
    async function getUserInfo() {
      if(token) {
        try {
          let {username, isAdmin} = jwtDecode(token)
          console.log('jwtDecode', username, isAdmin)
          JoblyApi.token = token;
          let currentUser = await JoblyApi.getCurrentUser(username);
          console.log('getCurrentUser', currentUser)
          console.log('can I get currentUser.username', currentUser.username)
          setCurrentUser(currentUser);
          console.log('setCurrentUser(currentUser)', currentUser.user)
          //currentUser.isAdmin = true);
          localStorage.setItem('user', JoblyApi.token)
          console.log(localStorage.getItem('user'))
         ;

      } catch (err) {
        console.error('problem loading user info', err)
        setCurrentUser(null)
      }
    } 
    
    } getUserInfo()
  }, [token])

  

  return (
    <>
    <ContextObject.Provider value={{token, setToken, currentUser, setCurrentUser, applicationIds, setApplicationIds}}>
    <NavBar />
    {/* <CurrentUser /> */}
    <Routes>
    {/**Can I wrap .Provider around a Route definition? */}
      
      <Route path='/' element={<Homepage />}/>
      {/**list all companies */}
      <Route path='/companies' element={<Companies />} />
      {/**view details of this company */}
      <Route path='/companies/:handle' element={<Company />} />
      {/**List all jobs */}
      <Route path='/jobs' element={<Jobs />} />
      {/**Login/signup  */}
      <Route path='/login' element={<Login />} />
      {/**Signup form */}
      <Route path='/signup' element={<Signup />} />
     
      <Route path='/profile'  element={<Profile />}/>
      <Route path='/logout' element={<Logout />}/>
    

    </Routes>
    </ContextObject.Provider>
  
    </>
  )

}

export default App;
