// import React, {useContext} from 'react'
// import ContextObject from './ContextObject'
// import { useNavigate } from 'react-router-dom'

// function Logout () {
//     let {setCurrentUser, setToken, setApplicationIds} = useContext(ContextObject) 
//     //####################null?
//     setCurrentUser('')
//     setApplicationIds()
//     setToken(null);

//     let goHome = useNavigate()
//     let navigateHome = () => {

//         goHome('/')
//      }
    
//     localStorage.removeItem('user')
//     if(localStorage.getItem('user'===null)){
//         console.log('key and token removed from storage')
//     }



//     return (
//         // <h1>Logged Out</h1>
//         {navigateHome}
       
//     )

// }

// export default Logout
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ContextObject from './ContextObject';

function Logout() {
    const { setCurrentUser, setToken, setApplicationIds } = useContext(ContextObject);
    const goHome = useNavigate();

    useEffect(() => {
    
        async function logout() {
            setCurrentUser(null); 
            setToken(null); 
            setApplicationIds([]); 

            
            localStorage.removeItem('user');

            if (localStorage.getItem('user') === null) {
                console.log('User data removed from localStorage');
            }

            
            goHome('/');
        }

        logout(); 
    }, []); 

    return (
        <div>
        <p>Logging out...</p>
        
        </div>
    );
    }

export default Logout;
